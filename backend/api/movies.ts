import { components } from "@backend/types/api";
import {
  TmdbMovie,
  TmdbMovieCredits,
  TmdbMovieSearch,
} from "@backend/types/tmdb";
import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import express from "express";

type Movie = components["schemas"]["Movie"];
type AddMovieRequest = components["schemas"]["AddMovieRequest"];
type FinishedMovieRequest = components["schemas"]["FinishedMovieRequest"];

const router = express.Router();

router.get("/search", async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${req.query.search_query}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const movieSearchResponse = (await response.json()) as TmdbMovieSearch;

  const searchResultsPromises = movieSearchResponse.results
    ?.slice(0, 8)
    .map(async (movieItem) => {
      const creditsResponse = (await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieItem.id}/credits`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${req.keyfileData?.tmdbToken}`,
            },
          }
        )
      ).json()) as TmdbMovieCredits;

      const directors = creditsResponse.crew
        .filter((crewDetails) => {
          return crewDetails.job?.toLowerCase() === "director";
        })
        .map((directorDetails) => {
          return directorDetails.name;
        });

      const starring = creditsResponse.cast?.slice(0, 3).map((castDetails) => {
        return castDetails.name;
      });

      return {
        title: movieItem.title,
        directors,
        starring,
        imgSrc: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieItem.poster_path}`,
        ids: [`tmdb:${movieItem.id}`],
        year: movieItem.release_date?.split("-")[0],
      } as Movie;
    });

  const searchResults = await Promise.all(searchResultsPromises);

  res.status(200).json(searchResults);
});

router.post("/add-to-shelf", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });

  const addMovieRequest = req.body as AddMovieRequest;

  const movieId = addMovieRequest.movie.ids[0].split(":")[1];
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

  if (tmdbMovieDetails.imdb_id) {
    addMovieRequest.movie.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addMovieRequest);

  if (tmdbMovieDetails.genres) {
    properties["Genre(s)"] = {
      multi_select: tmdbMovieDetails.genres
        .filter((genreDetails) => {
          return genreDetails.name;
        })
        .map((genreDetails) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { name: genreDetails.name! };
        }),
    };
  }

  properties["Status"] = {
    status: {
      name: "Backlog",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addMovieRequest.movie.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addMovieRequest.movie.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/watch-next", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addMovieRequest = req.body as AddMovieRequest;

  const movieId = addMovieRequest.movie.ids[0].split(":")[1];
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

  if (tmdbMovieDetails.imdb_id) {
    addMovieRequest.movie.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addMovieRequest);

  if (tmdbMovieDetails.genres) {
    properties["Genre(s)"] = {
      multi_select: tmdbMovieDetails.genres
        .filter((genreDetails) => {
          return genreDetails.name;
        })
        .map((genreDetails) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { name: genreDetails.name! };
        }),
    };
  }

  properties["Status"] = {
    status: {
      name: "Up Next",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addMovieRequest.movie.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addMovieRequest.movie.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/finished", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const finishedMovieRequest = req.body as FinishedMovieRequest;

  const movieId = finishedMovieRequest.movie.ids[0].split(":")[1];
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

  if (tmdbMovieDetails.imdb_id) {
    finishedMovieRequest.movie.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
  }

  const properties = generateCreatePageProperties(finishedMovieRequest);

  if (tmdbMovieDetails.genres) {
    properties["Genre(s)"] = {
      multi_select: tmdbMovieDetails.genres
        .filter((genreDetails) => {
          return genreDetails.name;
        })
        .map((genreDetails) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { name: genreDetails.name! };
        }),
    };
  }

  properties["Status"] = {
    status: {
      name: "Finished",
    },
  };

  properties["Rating /10"] = {
    select: {
      name: finishedMovieRequest.rating,
    },
  };

  properties["Finished Date"] = {
    date: {
      start: new Date().toISOString().split("T")[0],
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (finishedMovieRequest.movie.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedMovieRequest.movie.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/currently-watching", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addMovieRequest = req.body as AddMovieRequest;

  const movieId = addMovieRequest.movie.ids[0].split(":")[1];
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

  if (tmdbMovieDetails.imdb_id) {
    addMovieRequest.movie.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addMovieRequest);

  if (tmdbMovieDetails.genres) {
    properties["Genre(s)"] = {
      multi_select: tmdbMovieDetails.genres
        .filter((genreDetails) => {
          return genreDetails.name;
        })
        .map((genreDetails) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { name: genreDetails.name! };
        }),
    };
  }

  properties["Status"] = {
    status: {
      name: "Watching",
    },
  };

  properties["Start Date"] = {
    date: {
      start: new Date().toISOString().split("T")[0],
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addMovieRequest.movie.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addMovieRequest.movie.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

function generateCreatePageProperties(addMovieRequest: AddMovieRequest) {
  const properties: CreatePageParameters["properties"] = {
    Title: {
      title: [{ text: { content: addMovieRequest.movie.title } }],
    },
  };

  properties["Media Type"] = {
    select: {
      name: "Movie",
    },
  };

  properties["Added"] = {
    date: {
      start: new Date().toISOString(),
    },
  };

  properties["ID"] = {
    rich_text: [
      {
        text: {
          content: addMovieRequest.movie.ids
            .reduce((accumulator, id) => `${accumulator}${id} `, "")
            .trim(),
        },
      },
    ],
  };

  if (addMovieRequest.movie.directors) {
    properties["Author(s)"] = {
      multi_select: addMovieRequest.movie.directors.map((director) => {
        if (director.includes(",")) {
          const directorsSplit = director.split(",");
          director = `${directorsSplit[1]} ${directorsSplit[0]}`;
        }
        return { name: director };
      }),
    };
  }

  if (addMovieRequest.movie.year) {
    properties["Year"] = {
      rich_text: [{ text: { content: addMovieRequest.movie.year } }],
    };
  }

  return properties;
}

export default router;

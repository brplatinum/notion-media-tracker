import { components } from "@backend/types/api";
import {
  TmdbTv,
  TmdbTvAggregateCredits,
  TmdbTvExternalCredits,
  TmdbTvSearch,
} from "@backend/types/tmdb";
import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import express from "express";

type TvShow = components["schemas"]["TvShow"];
type AddTvShowRequest = components["schemas"]["AddTvShowRequest"];
type FinishedTvShowRequest = components["schemas"]["FinishedTvShowRequest"];

const router = express.Router();

router.get("/search", async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${req.query.search_query}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tvSearchResponse = (await response.json()) as TmdbTvSearch;

  const searchResultsPromises = tvSearchResponse.results
    ?.slice(0, 8)
    .map(async (tvItem): Promise<TvShow> => {
      const tvDetails = (await (
        await fetch(`https://api.themoviedb.org/3/tv/${tvItem.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${req.keyfileData?.tmdbToken}`,
          },
        })
      ).json()) as TmdbTv;

      const tvCredits = (await (
        await fetch(
          `https://api.themoviedb.org/3/tv/${tvItem.id}/aggregate_credits`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${req.keyfileData?.tmdbToken}`,
            },
          }
        )
      ).json()) as TmdbTvAggregateCredits;

      const genres = tvDetails.genres.map((genre) => {
        return genre.name;
      });

      const creators =
        tvDetails.created_by.length > 0
          ? tvDetails.created_by.map((createdBy) => {
              return createdBy.name;
            })
          : tvCredits.crew
              .filter((crewDetails) => {
                const jobs = crewDetails.jobs.map((jobDetails) =>
                  jobDetails.job.toLowerCase()
                );
                return jobs.includes("series director");
              })
              .map((directorDetails) => {
                return directorDetails.name;
              });

      const starring = tvCredits.cast.slice(0, 3).map((castDetails) => {
        return castDetails.name;
      });

      return {
        title: tvItem.name,
        creators,
        starring,
        imgSrc: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvItem.poster_path}`,
        ids: [`tmdb:${tvItem.id}`],
        year: tvItem.first_air_date?.split("-")[0],
        genres,
      };
    });

  const searchResults = await Promise.all(searchResultsPromises);

  res.status(200).json(searchResults);
});

router.post("/add-to-shelf", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addTvRequest = req.body as AddTvShowRequest;

  const tvId = addTvRequest.tvShow.ids[0].split(":")[1];
  const tvExternalCreditsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/external_ids`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbTvExternalCredits =
    (await tvExternalCreditsResponse.json()) as TmdbTvExternalCredits;

  if (tmdbTvExternalCredits.imdb_id) {
    addTvRequest.tvShow.ids.push(`imdb:${tmdbTvExternalCredits.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addTvRequest);

  properties["Status"] = {
    status: {
      name: "Backlog",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addTvRequest.tvShow.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addTvRequest.tvShow.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/watch-next", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addTvRequest = req.body as AddTvShowRequest;

  const tvId = addTvRequest.tvShow.ids[0].split(":")[1];
  const tvExternalCreditsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/external_ids`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbTvExternalCredits =
    (await tvExternalCreditsResponse.json()) as TmdbTvExternalCredits;

  if (tmdbTvExternalCredits.imdb_id) {
    addTvRequest.tvShow.ids.push(`imdb:${tmdbTvExternalCredits.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addTvRequest);

  properties["Status"] = {
    status: {
      name: "Up Next",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addTvRequest.tvShow.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addTvRequest.tvShow.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/finished", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const finishedTvRequest = req.body as FinishedTvShowRequest;

  const tvId = finishedTvRequest.tvShow.ids[0].split(":")[1];
  const tvExternalCreditsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/external_ids`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbTvExternalCredits =
    (await tvExternalCreditsResponse.json()) as TmdbTvExternalCredits;

  if (tmdbTvExternalCredits.imdb_id) {
    finishedTvRequest.tvShow.ids.push(`imdb:${tmdbTvExternalCredits.imdb_id}`);
  }

  const properties = generateCreatePageProperties(finishedTvRequest);

  properties["Status"] = {
    status: {
      name: "Finished",
    },
  };

  properties["Rating /10"] = {
    select: {
      name: finishedTvRequest.rating,
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

  if (finishedTvRequest.tvShow.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedTvRequest.tvShow.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/currently-watching", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addTvRequest = req.body as AddTvShowRequest;

  const tvId = addTvRequest.tvShow.ids[0].split(":")[1];
  const tvExternalCreditsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/external_ids`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${req.keyfileData?.tmdbToken}` },
    }
  );

  const tmdbTvExternalCredits =
    (await tvExternalCreditsResponse.json()) as TmdbTvExternalCredits;

  if (tmdbTvExternalCredits.imdb_id) {
    addTvRequest.tvShow.ids.push(`imdb:${tmdbTvExternalCredits.imdb_id}`);
  }

  const properties = generateCreatePageProperties(addTvRequest);

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

  if (addTvRequest.tvShow.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addTvRequest.tvShow.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

function generateCreatePageProperties(addTvRequest: AddTvShowRequest) {
  const properties: CreatePageParameters["properties"] = {
    Title: {
      title: [{ text: { content: addTvRequest.tvShow.title } }],
    },
  };

  properties["Media Type"] = {
    select: {
      name: "TV Show",
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
          content: addTvRequest.tvShow.ids
            .reduce((accumulator, id) => `${accumulator}${id} `, "")
            .trim(),
        },
      },
    ],
  };

  if (addTvRequest.tvShow.creators) {
    properties["Author(s)"] = {
      multi_select: addTvRequest.tvShow.creators.map((creator) => {
        if (creator.includes(",")) {
          const directorsSplit = creator.split(",");
          creator = `${directorsSplit[1]} ${directorsSplit[0]}`;
        }
        return { name: creator };
      }),
    };
  }

  if (addTvRequest.tvShow.genres) {
    properties["Genre(s)"] = {
      multi_select: addTvRequest.tvShow.genres.map((genre) => {
        return { name: genre };
      }),
    };
  }

  if (addTvRequest.tvShow.year) {
    properties["Year"] = {
      rich_text: [{ text: { content: addTvRequest.tvShow.year } }],
    };
  }

  return properties;
}

export default router;

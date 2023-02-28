import { AddMovieRequest } from "@backend/types/movies-api";
import { TmdbTv, TmdbTvCredits, TmdbTvSearch } from "@backend/types/tmdb";
import { TvInfo } from "@backend/types/tv-api";
import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import express from "express";

const router = express.Router();
const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_TOKEN,
});

router.get("/search", async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${req.query.search_query}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
    }
  );

  const tvSearchResponse = (await response.json()) as TmdbTvSearch;

  const searchResultsPromises = tvSearchResponse.results
    ?.slice(0, 8)
    .map(async (tvItem): Promise<TvInfo> => {
      const tvDetails = (await (
        await fetch(`https://api.themoviedb.org/3/tv/${tvItem.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
        })
      ).json()) as TmdbTv;

      const tvCast = (
        (await (
          await fetch(`https://api.themoviedb.org/3/tv/${tvItem.id}/credits`, {
            method: "GET",
            headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
          })
        ).json()) as TmdbTvCredits
      ).crew;

      const genres = tvDetails.genres.map((genre) => {
        return genre.name;
      });

      const starring = tvCast.slice(0, 3).map((castDetails) => {
        return castDetails.name;
      });

      return {
        title: tvItem.name,
        creators: tvDetails.created_by.map((createdBy) => {
          return createdBy.name;
        }),
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

// router.post("/add-to-shelf", async (req, res) => {
//   const addMovieRequest = req.body as AddMovieRequest;

//   const movieId = addMovieRequest.movieInfo.ids[0].split(":")[1];
//   const movieResponse = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
//     }
//   );

//   const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

//   if (tmdbMovieDetails.imdb_id) {
//     addMovieRequest.movieInfo.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
//   }

//   const properties = generateCreatePageProperties(addMovieRequest);

//   if (tmdbMovieDetails.genres) {
//     properties["Genre(s)"] = {
//       multi_select: tmdbMovieDetails.genres
//         .filter((genreDetails) => {
//           return genreDetails.name;
//         })
//         .map((genreDetails) => {
//           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//           return { name: genreDetails.name! };
//         }),
//     };
//   }

//   properties["Status"] = {
//     status: {
//       name: "Backlog",
//     },
//   };

//   const createPageParameters: CreatePageParameters = {
//     parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
//     properties,
//   };

//   if (addMovieRequest.movieInfo.imgSrc)
//     createPageParameters["cover"] = {
//       external: {
//         url: addMovieRequest.movieInfo.imgSrc,
//       },
//     };

//   await notion.pages.create(createPageParameters);

//   res.sendStatus(200);
// });

// router.post("/watch-next", async (req, res) => {
//   const addMovieRequest = req.body as AddMovieRequest;

//   const movieId = addMovieRequest.movieInfo.ids[0].split(":")[1];
//   const movieResponse = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
//     }
//   );

//   const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

//   if (tmdbMovieDetails.imdb_id) {
//     addMovieRequest.movieInfo.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
//   }

//   const properties = generateCreatePageProperties(addMovieRequest);

//   if (tmdbMovieDetails.genres) {
//     properties["Genre(s)"] = {
//       multi_select: tmdbMovieDetails.genres
//         .filter((genreDetails) => {
//           return genreDetails.name;
//         })
//         .map((genreDetails) => {
//           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//           return { name: genreDetails.name! };
//         }),
//     };
//   }

//   properties["Status"] = {
//     status: {
//       name: "Up Next",
//     },
//   };

//   const createPageParameters: CreatePageParameters = {
//     parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
//     properties,
//   };

//   if (addMovieRequest.movieInfo.imgSrc)
//     createPageParameters["cover"] = {
//       external: {
//         url: addMovieRequest.movieInfo.imgSrc,
//       },
//     };

//   await notion.pages.create(createPageParameters);

//   res.sendStatus(200);
// });

// router.post("/finished", async (req, res) => {
//   const finishedMovieRequest = req.body as FinishedMovieRequest;

//   const movieId = finishedMovieRequest.movieInfo.ids[0].split(":")[1];
//   const movieResponse = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
//     }
//   );

//   const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

//   if (tmdbMovieDetails.imdb_id) {
//     finishedMovieRequest.movieInfo.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
//   }

//   const properties = generateCreatePageProperties(finishedMovieRequest);

//   if (tmdbMovieDetails.genres) {
//     properties["Genre(s)"] = {
//       multi_select: tmdbMovieDetails.genres
//         .filter((genreDetails) => {
//           return genreDetails.name;
//         })
//         .map((genreDetails) => {
//           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//           return { name: genreDetails.name! };
//         }),
//     };
//   }

//   properties["Status"] = {
//     status: {
//       name: "Finished",
//     },
//   };

//   properties["Rating /10"] = {
//     select: {
//       name: finishedMovieRequest.rating,
//     },
//   };

//   properties["Finished Date"] = {
//     date: {
//       start: new Date().toISOString().split("T")[0],
//     },
//   };

//   const createPageParameters: CreatePageParameters = {
//     parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
//     properties,
//   };

//   if (finishedMovieRequest.movieInfo.imgSrc)
//     createPageParameters["cover"] = {
//       external: {
//         url: finishedMovieRequest.movieInfo.imgSrc,
//       },
//     };

//   await notion.pages.create(createPageParameters);

//   res.sendStatus(200);
// });

// router.post("/currently-watching", async (req, res) => {
//   const addMovieRequest = req.body as AddMovieRequest;

//   const movieId = addMovieRequest.movieInfo.ids[0].split(":")[1];
//   const movieResponse = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
//     }
//   );

//   const tmdbMovieDetails = (await movieResponse.json()) as TmdbMovie;

//   if (tmdbMovieDetails.imdb_id) {
//     addMovieRequest.movieInfo.ids.push(`imdb:${tmdbMovieDetails.imdb_id}`);
//   }

//   const properties = generateCreatePageProperties(addMovieRequest);

//   if (tmdbMovieDetails.genres) {
//     properties["Genre(s)"] = {
//       multi_select: tmdbMovieDetails.genres
//         .filter((genreDetails) => {
//           return genreDetails.name;
//         })
//         .map((genreDetails) => {
//           // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//           return { name: genreDetails.name! };
//         }),
//     };
//   }

//   properties["Status"] = {
//     status: {
//       name: "Watching",
//     },
//   };

//   properties["Start Date"] = {
//     date: {
//       start: new Date().toISOString().split("T")[0],
//     },
//   };

//   const createPageParameters: CreatePageParameters = {
//     parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
//     properties,
//   };

//   if (addMovieRequest.movieInfo.imgSrc)
//     createPageParameters["cover"] = {
//       external: {
//         url: addMovieRequest.movieInfo.imgSrc,
//       },
//     };

//   await notion.pages.create(createPageParameters);

//   res.sendStatus(200);
// });

function generateCreatePageProperties(addMovieRequest: AddMovieRequest) {
  const properties: CreatePageParameters["properties"] = {
    Title: {
      title: [{ text: { content: addMovieRequest.movieInfo.title } }],
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
          content: addMovieRequest.movieInfo.ids
            .reduce((accumulator, id) => `${accumulator}${id} `, "")
            .trim(),
        },
      },
    ],
  };

  if (addMovieRequest.movieInfo.directors) {
    properties["Author(s)"] = {
      multi_select: addMovieRequest.movieInfo.directors.map((director) => {
        if (director.includes(",")) {
          const directorsSplit = director.split(",");
          director = `${directorsSplit[1]} ${directorsSplit[0]}`;
        }
        return { name: director };
      }),
    };
  }

  if (addMovieRequest.movieInfo.year) {
    properties["Year"] = {
      rich_text: [{ text: { content: addMovieRequest.movieInfo.year } }],
    };
  }

  return properties;
}

export default router;

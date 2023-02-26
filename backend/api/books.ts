import {
  AddBookRequest,
  BookInfo,
  FinishedBookRequest,
} from "@backend/types/books-api";
import { GoogleBook } from "@backend/types/google-books";
import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import express from "express";

const router = express.Router();
const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_TOKEN,
});

router.get("/search", async (req, res) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.search_query}`,
    {
      method: "GET",
    }
  );

  const googleBooks = (await response.json()) as { items: GoogleBook[] };

  const searchResults = googleBooks.items.slice(0, 8).map((bookItem) => {
    const isbn =
      bookItem.volumeInfo.industryIdentifiers?.find((industryIdentifier) => {
        return industryIdentifier.type === "ISBN_13";
      })?.identifier ||
      bookItem.volumeInfo.industryIdentifiers?.find((industryIdentifier) => {
        return industryIdentifier.type === "ISBN_10";
      })?.identifier;

    const ids = isbn
      ? [`isbn:${isbn}`, `google:${bookItem.id}`]
      : [`google:${bookItem.id}`];

    return {
      title: bookItem.volumeInfo.title,
      subtitle: bookItem.volumeInfo.subtitle,
      authors: bookItem.volumeInfo.authors,
      imgSrc: bookItem.volumeInfo.imageLinks?.thumbnail,
      genres: bookItem.volumeInfo.categories,
      ids,
      year: bookItem.volumeInfo.publishedDate?.split("-")[0],
    } as BookInfo;
  });

  res.status(200).json(searchResults);
});

router.post("/add-to-shelf", async (req, res) => {
  const addBookRequest = req.body as AddBookRequest;
  const properties = generateCreatePageProperties(addBookRequest);

  properties["Status"] = {
    status: {
      name: "Backlog",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
    properties,
  };

  if (addBookRequest.bookInfo.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addBookRequest.bookInfo.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/read-next", async (req, res) => {
  const addBookRequest = req.body as AddBookRequest;
  const properties = generateCreatePageProperties(addBookRequest);

  properties["Status"] = {
    status: {
      name: "Up Next",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
    properties,
  };

  if (addBookRequest.bookInfo.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addBookRequest.bookInfo.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/finished", async (req, res) => {
  const finishedBookRequest = req.body as FinishedBookRequest;
  const properties = generateCreatePageProperties(finishedBookRequest);

  properties["Status"] = {
    status: {
      name: "Finished",
    },
  };

  properties["Rating /10"] = {
    select: {
      name: finishedBookRequest.rating,
    },
  };

  properties["Finished Date"] = {
    date: {
      start: new Date().toISOString().split("T")[0],
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
    properties,
  };

  if (finishedBookRequest.bookInfo.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedBookRequest.bookInfo.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

router.post("/currently-reading", async (req, res) => {
  const finishedBookRequest = req.body as AddBookRequest;
  const properties = generateCreatePageProperties(finishedBookRequest);

  properties["Status"] = {
    status: {
      name: "Reading",
    },
  };

  properties["Start Date"] = {
    date: {
      start: new Date().toISOString().split("T")[0],
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: process.env.NOTION_DATABASE_ID || "" },
    properties,
  };

  if (finishedBookRequest.bookInfo.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedBookRequest.bookInfo.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(200);
});

function generateCreatePageProperties(
  addBookRequest: AddBookRequest | FinishedBookRequest
) {
  const properties: CreatePageParameters["properties"] = {
    Title: {
      title: [{ text: { content: addBookRequest.bookInfo.title } }],
    },
  };

  properties["Media Type"] = {
    select: {
      name: "Book",
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
          content: addBookRequest.bookInfo.ids
            .reduce((accumulator, id) => `${accumulator}${id} `, "")
            .trim(),
        },
      },
    ],
  };

  if (addBookRequest.bookInfo.authors) {
    properties["Author(s)"] = {
      multi_select: addBookRequest.bookInfo.authors.map((author) => {
        if (author.includes(",")) {
          const authorsSplit = author.split(",");
          author = `${authorsSplit[1]} ${authorsSplit[0]}`;
        }
        return { name: author };
      }),
    };
  }

  if (addBookRequest.bookInfo.subtitle) {
    properties["Subtitle"] = {
      rich_text: [{ text: { content: addBookRequest.bookInfo.subtitle } }],
    };
  }

  if (addBookRequest.bookInfo.genres) {
    properties["Genre(s)"] = {
      multi_select: addBookRequest.bookInfo.genres.map((genre) => {
        return { name: genre };
      }),
    };
  }

  if (addBookRequest.bookInfo.year) {
    properties["Year"] = {
      rich_text: [{ text: { content: addBookRequest.bookInfo.year } }],
    };
  }

  return properties;
}

export default router;

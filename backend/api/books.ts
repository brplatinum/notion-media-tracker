import { components } from "@backend/types/api";
import { GoogleBook } from "@backend/types/google-books";
import { Client } from "@notionhq/client";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import express from "express";

type Book = components["schemas"]["Book"];
type AddBookRequest = components["schemas"]["AddBookRequest"];
type FinishedBookRequest = components["schemas"]["FinishedBookRequest"];

const router = express.Router();

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
    } as Book;
  });

  res.status(200).json(searchResults);
});

router.post("/add-to-shelf", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });
  const addBookRequest = req.body as AddBookRequest;
  const properties = generateCreatePageProperties(addBookRequest);

  properties["Status"] = {
    status: {
      name: "Backlog",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addBookRequest.book.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addBookRequest.book.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/read-next", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });

  const addBookRequest = req.body as AddBookRequest;
  const properties = generateCreatePageProperties(addBookRequest);

  properties["Status"] = {
    status: {
      name: "Up Next",
    },
  };

  const createPageParameters: CreatePageParameters = {
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (addBookRequest.book.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: addBookRequest.book.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/finished", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });

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
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (finishedBookRequest.book.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedBookRequest.book.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

router.post("/currently-reading", async (req, res) => {
  const notion = new Client({
    auth: req.keyfileData?.notionIntegrationToken ?? "",
  });

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
    parent: { database_id: req.keyfileData?.notionDatabaseId || "" },
    properties,
  };

  if (finishedBookRequest.book.imgSrc)
    createPageParameters["cover"] = {
      external: {
        url: finishedBookRequest.book.imgSrc,
      },
    };

  await notion.pages.create(createPageParameters);

  res.sendStatus(201);
});

function generateCreatePageProperties(
  addBookRequest: AddBookRequest | FinishedBookRequest
) {
  const properties: CreatePageParameters["properties"] = {
    Title: {
      title: [{ text: { content: addBookRequest.book.title } }],
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
          content: addBookRequest.book.ids
            .reduce((accumulator, id) => `${accumulator}${id} `, "")
            .trim(),
        },
      },
    ],
  };

  if (addBookRequest.book.authors) {
    properties["Author(s)"] = {
      multi_select: addBookRequest.book.authors.map((author) => {
        if (author.includes(",")) {
          const authorsSplit = author.split(",");
          author = `${authorsSplit[1]} ${authorsSplit[0]}`;
        }
        return { name: author };
      }),
    };
  }

  if (addBookRequest.book.subtitle) {
    properties["Subtitle"] = {
      rich_text: [{ text: { content: addBookRequest.book.subtitle } }],
    };
  }

  if (addBookRequest.book.genres) {
    properties["Genre(s)"] = {
      multi_select: addBookRequest.book.genres.map((genre) => {
        return { name: genre };
      }),
    };
  }

  if (addBookRequest.book.year) {
    properties["Year"] = {
      rich_text: [{ text: { content: addBookRequest.book.year } }],
    };
  }

  return properties;
}

export default router;

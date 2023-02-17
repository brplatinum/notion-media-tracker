import { SearchResultInfo } from "@backend/types/books-api";
import { GoogleBook } from "@backend/types/google-books";
import express from "express";

const router = express.Router();

router.get("/results", async (req, res) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.search_query}`,
    {
      method: "GET",
    }
  );

  const googleBooks = (await response.json()) as { items: GoogleBook[] };

  const searchResults = googleBooks.items.map((bookItem: GoogleBook) => {
    return {
      title: bookItem.volumeInfo.title,
      subtitle: bookItem.volumeInfo.subtitle,
      authors: bookItem.volumeInfo.authors,
      imgSrc: bookItem.volumeInfo.imageLinks?.thumbnail,
    } as SearchResultInfo;
  });

  res.status(200).json(searchResults);
});

export default router;

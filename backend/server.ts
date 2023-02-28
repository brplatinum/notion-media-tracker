import cors from "cors";
import express from "express";
import booksRouter from "./api/books.js";
import moviesRouter from "./api/movies.js";
import tvRouter from "./api/tv.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    optionsSuccessStatus: 200,
  })
);

app.use("/books", booksRouter);
app.use("/movies", moviesRouter);
app.use("/tv", tvRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

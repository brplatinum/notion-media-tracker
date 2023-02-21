import express from "express";
import bookRouter from "./api/books.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }));

app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

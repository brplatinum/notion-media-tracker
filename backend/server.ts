import express from "express";
import bookRouter from "./api/books.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();
const app = express();
const PORT = process.env.port || 9009;

app.use(express.json());

app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

import express from "express";
import bookRouter from "./api/books.js";

const app = express();
const PORT = process.env.port || 9009;

app.use(express.json());

app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

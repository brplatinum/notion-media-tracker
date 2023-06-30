import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import path from "path";
import booksRouter from "./api/books.js";
import moviesRouter from "./api/movies.js";
import tvRouter from "./api/tv.js";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use("/books", booksRouter);
app.use("/movies", moviesRouter);
app.use("/tv", tvRouter);

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yml",
    validateRequests: true,
    validateResponses: true,
  })
);

app.use(
  (
    err: { status: number; message: string; errors: string[] },
    _req: Request,
    res: Response,
    // We must provide a next function for the function signature here even though its not used
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    // format error
    console.log("SHIEEEEEEEEEEEEEEEEEEEEET");
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

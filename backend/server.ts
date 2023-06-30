import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import fs from "fs";
import path from "path";
import booksRouter from "./api/books.js";
import moviesRouter from "./api/movies.js";
import tvRouter from "./api/tv.js";
import { components } from "./types/api.js";
import { KeyfileData } from "./types/server.js";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
const keyfilePath = "../config/keyfile.json";

type KeysNeededResponse = components["schemas"]["KeysNeeded"];

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

app.get("/setup", async (req, res) => {
  const keysNeededResponse: KeysNeededResponse = { keysNeeded: [] };
  if (fs.existsSync(keyfilePath)) {
    fs.readFile(keyfilePath, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log("Failed to read file: " + keyfilePath);
        throw err;
      }
      const keyfileData = JSON.parse(data.toString()) as KeyfileData;

      !keyfileData.notionDatabaseId
        ? keysNeededResponse.keysNeeded?.push("NOTION_DATABASE_ID")
        : null;
      !keyfileData.notionIntegrationToken
        ? keysNeededResponse.keysNeeded?.push("NOTION_INTEGRATION_TOKEN")
        : null;
      !keyfileData.tmdbToken
        ? keysNeededResponse.keysNeeded?.push("TMDB_TOKEN")
        : null;

      res.status(200).json(keysNeededResponse);
    });
  } else {
    const keyfileData: KeyfileData = {
      notionIntegrationToken: null,
      notionDatabaseId: null,
      tmdbToken: null,
    };
    fs.writeFile(keyfilePath, JSON.stringify(keyfileData), (err) => {
      if (err) {
        res.sendStatus(500);
        console.log("Failed to write file: " + keyfilePath);
        throw err;
      } else {
        console.log("Successfully wrote to file: " + keyfilePath);
        res.send(200).json(keysNeededResponse);
      }
    });
  }
});

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
    console.log("Something went wrong");
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

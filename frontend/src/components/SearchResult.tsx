import { BookInfo } from "@backend/types/books-api";
import { Image, Text } from "@mantine/core";
import { FC } from "react";
import {
  addBookToNotion,
  addFinishedBookToNotion,
  addNextBookToNotion,
} from "../services/books-service";
import SearchResultButtons from "./SearchResultButtons";

const formatAuthors = (authors: string[]) => {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  let authorsOutput = "";

  for (let i = 0; i < authorsOutput.length - 1; i++) {
    authorsOutput += `${authors[i]},`;
  }

  return `${authorsOutput} and ${authors[authors.length - 1]}`;
};

const SearchResult: FC<BookInfo> = ({
  title,
  subtitle,
  authors,
  imgSrc,
  genres,
  ids,
  year,
}) => {
  function handleAddItemClick() {
    addBookToNotion({ title, subtitle, authors, imgSrc, genres, ids, year });
  }

  function handleAddNextClick() {
    addNextBookToNotion({
      title,
      subtitle,
      authors,
      imgSrc,
      genres,
      ids,
      year,
    });
  }

  function handleRatingChange(rating: number) {
    addFinishedBookToNotion(
      {
        title,
        subtitle,
        authors,
        imgSrc,
        genres,
        ids,
        year,
      },
      rating
    );
  }

  return (
    <div className="SearchResult">
      <Image
        width={120}
        radius="md"
        src={imgSrc}
        fit="contain"
        withPlaceholder
      />
      <Text fz="xl">{title}</Text>
      <Text fz="md">{subtitle}</Text>
      {authors ? <Text fz="lg">by {formatAuthors(authors)}</Text> : null}
      <SearchResultButtons
        nextText="Read next"
        currentlyText="Currently reading"
        handleAddItemClick={handleAddItemClick}
        handleAddNextClick={handleAddNextClick}
        handleRatingChange={handleRatingChange}
      ></SearchResultButtons>
    </div>
  );
};

export default SearchResult;

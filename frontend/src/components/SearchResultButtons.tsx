import { Button, Image, Text } from "@mantine/core";
import { FC, useState } from "react";
import { SearchResultInfo } from "@backend/types/books-api";

const formatAuthors = (authors: string[]) => {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  let authorsOutput = "";

  for (let i = 0; i < authorsOutput.length - 1; i++) {
    authorsOutput += `${authors[i]},`;
  }

  return `${authorsOutput} and ${authors[authors.length - 1]}`;
};

const SearchResultButtons: FC<{ nextText: string; currentlyText: string }> = ({
  nextText,
  currentlyText,
}) => {
  return (
    <div className="SearchResultButtons">
      <Button>Add to shelf</Button>
      <Button>{nextText}</Button>
      <Button>Finished</Button>
      <Button>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

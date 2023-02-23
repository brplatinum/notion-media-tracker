import { Button } from "@mantine/core";
import { FC } from "react";

const formatAuthors = (authors: string[]) => {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  let authorsOutput = "";

  for (let i = 0; i < authorsOutput.length - 1; i++) {
    authorsOutput += `${authors[i]},`;
  }

  return `${authorsOutput} and ${authors[authors.length - 1]}`;
};

const SearchResultButtons: FC<{
  nextText: string;
  currentlyText: string;
  handleAddItemClick: () => void;
}> = ({ nextText, currentlyText, handleAddItemClick }) => {
  return (
    <div className="SearchResultButtons">
      <Button onClick={handleAddItemClick}>Add to shelf</Button>
      <Button>{nextText}</Button>
      <Button>Finished</Button>
      <Button>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

import { Button } from "@mantine/core";

type SearchResultButtonsProps = {
  nextText: string;
  currentlyText: string;
  handleAddItemClick: () => void;
  handleAddNextClick: () => void;
};

const SearchResultButtons = ({
  nextText,
  currentlyText,
  handleAddItemClick,
  handleAddNextClick,
}: SearchResultButtonsProps) => {
  return (
    <div className="SearchResultButtons">
      <Button onClick={handleAddItemClick}>Add to shelf</Button>
      <Button onClick={handleAddNextClick}>{nextText}</Button>
      <Button>Finished</Button>
      <Button>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

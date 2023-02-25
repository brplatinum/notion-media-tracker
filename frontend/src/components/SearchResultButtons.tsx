import { Button, Menu, Rating } from "@mantine/core";

type SearchResultButtonsProps = {
  nextText: string;
  currentlyText: string;
  handleAddShelfClick: () => void;
  handleAddNextClick: () => void;
  handleRatingChange: (rating: number) => void;
  handleAddCurrentClick: () => void;
};

const SearchResultButtons = ({
  nextText,
  currentlyText,
  handleAddShelfClick,
  handleAddNextClick,
  handleRatingChange,
  handleAddCurrentClick,
}: SearchResultButtonsProps) => {
  return (
    <div className="SearchResultButtons">
      <Button onClick={handleAddShelfClick}>Add to shelf</Button>
      <Button onClick={handleAddNextClick}>{nextText}</Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Finished</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Rating</Menu.Label>
          <Menu.Item>
            <Rating fractions={2} onChange={handleRatingChange} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Button onClick={handleAddCurrentClick}>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

import { Button, Menu, Rating } from "@mantine/core";

type SearchResultButtonsProps = {
  nextText: string;
  currentlyText: string;
  handleAddItemClick: () => void;
  handleAddNextClick: () => void;
  handleRatingChange: (rating: number) => void;
};

const SearchResultButtons = ({
  nextText,
  currentlyText,
  handleAddItemClick,
  handleAddNextClick,
  handleRatingChange,
}: SearchResultButtonsProps) => {
  return (
    <div className="SearchResultButtons">
      <Button onClick={handleAddItemClick}>Add to shelf</Button>
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
      <Button>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

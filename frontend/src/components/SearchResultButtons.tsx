import { Button, Menu, Rating } from "@mantine/core";

type SearchResultButtonsProps = {
  nextText: string;
  currentlyText: string;
  onAddShelfClick: () => void;
  onAddNextClick: () => void;
  onRatingChange: (rating: number) => void;
  onAddCurrentClick: () => void;
};

const SearchResultButtons = ({
  nextText,
  currentlyText,
  onAddShelfClick,
  onAddNextClick,
  onRatingChange,
  onAddCurrentClick,
}: SearchResultButtonsProps) => {
  return (
    <div className="SearchResultButtons">
      <Button onClick={onAddShelfClick}>Add to shelf</Button>
      <Button onClick={onAddNextClick}>{nextText}</Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Finished</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Rating</Menu.Label>
          <Menu.Item>
            <Rating fractions={2} onChange={onRatingChange} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Button onClick={onAddCurrentClick}>{currentlyText}</Button>
    </div>
  );
};

export default SearchResultButtons;

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
      <Button
        onClick={onAddShelfClick}
        className="searchResultButton"
        variant="outline"
        compact
      >
        Add to shelf
      </Button>
      <Button
        onClick={onAddNextClick}
        className="searchResultButton"
        variant="outline"
        compact
      >
        {nextText}
      </Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button className="searchResultButton" variant="outline" compact>
            Finished
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Rating</Menu.Label>
          <Menu.Item>
            <Rating
              className="ratingMenuItem"
              fractions={2}
              onChange={onRatingChange}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Button
        onClick={onAddCurrentClick}
        className="searchResultButton"
        variant="outline"
        compact
      >
        {currentlyText}
      </Button>
    </div>
  );
};

export default SearchResultButtons;

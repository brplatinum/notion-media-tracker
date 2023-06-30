import { Image, Text } from "@mantine/core";
import { MediaInfo } from "../types/util";
import "./SearchResult.css";
import SearchResultButtons from "./SearchResultButtons";

const formatPeople = (people: string[]) => {
  if (people.length === 1) return people[0];
  if (people.length === 2) return `${people[0]} and ${people[1]}`;

  let peopleOutput = "";

  for (let i = 0; i < people.length - 1; i++) {
    peopleOutput += `${people[i]}, `;
  }

  return `${peopleOutput} and ${people[people.length - 1]}`;
};

type SearchResultProps = {
  mediaInfo: MediaInfo;
  showYearInTitle?: boolean;
  onAddShelfClick: (mediaInfo: MediaInfo) => void;
  onAddNextClick: (mediaInfo: MediaInfo) => void;
  onRatingChange: (mediaInfo: MediaInfo, rating: number) => void;
  onAddCurrentClick: (mediaInfo: MediaInfo) => void;
};

const SearchResult = ({
  mediaInfo,
  showYearInTitle = false,
  onAddShelfClick,
  onAddNextClick,
  onRatingChange,
  onAddCurrentClick,
}: SearchResultProps) => {
  function handleAddShelfClick() {
    onAddShelfClick(mediaInfo);
  }

  function handleAddNextClick() {
    onAddNextClick(mediaInfo);
  }

  function handleRatingChange(rating: number) {
    onRatingChange(mediaInfo, rating);
  }

  function handleAddCurrentClick() {
    onAddCurrentClick(mediaInfo);
  }

  return (
    <div className="searchResult">
      <div className="imageInfoFlex">
        <Image
          width={120}
          radius="md"
          src={mediaInfo.imgSrc}
          fit="contain"
          withPlaceholder
          className="coverImage"
        />
        <div className="mediaInfo">
          <Text fz="xl">
            {showYearInTitle && mediaInfo.year
              ? `${mediaInfo.title} (${mediaInfo.year})`
              : mediaInfo.title}
          </Text>
          <Text fz="md">{mediaInfo.subtitle}</Text>
          {mediaInfo.creators?.length ? (
            <Text fz="lg">by {formatPeople(mediaInfo.creators)}</Text>
          ) : null}
          {mediaInfo.starring?.length ? (
            <Text fz="lg">starring {formatPeople(mediaInfo.starring)}</Text>
          ) : null}
        </div>
      </div>
      <SearchResultButtons
        nextText="Read next"
        currentlyText="Currently reading"
        onAddShelfClick={handleAddShelfClick}
        onAddNextClick={handleAddNextClick}
        onRatingChange={handleRatingChange}
        onAddCurrentClick={handleAddCurrentClick}
      ></SearchResultButtons>
    </div>
  );
};

export default SearchResult;

import { Image, Text } from "@mantine/core";
import {
  addBookToNotion,
  addCurrentBookToNotion,
  addFinishedBookToNotion,
  addNextBookToNotion,
} from "../services/books-service";
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
  title: string;
  subtitle?: string;
  creators?: string[];
  starring?: string[];
  imgSrc?: string;
  genres?: string[];
  ids: string[];
  year?: string;
  showYearInTitle?: boolean;
};

const SearchResult = ({
  title,
  subtitle,
  creators,
  starring,
  imgSrc,
  genres,
  ids,
  year,
  showYearInTitle = false,
}: SearchResultProps) => {
  function handleAddShelfClick() {
    addBookToNotion({
      title,
      subtitle,
      authors: creators,
      imgSrc,
      genres,
      ids,
      year,
    });
  }

  function handleAddNextClick() {
    addNextBookToNotion({
      title,
      subtitle,
      authors: creators,
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
        authors: creators,
        imgSrc,
        genres,
        ids,
        year,
      },
      rating
    );
  }

  function handleAddCurrentClick() {
    addCurrentBookToNotion({
      title,
      subtitle,
      authors: creators,
      imgSrc,
      genres,
      ids,
      year,
    });
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
      <Text fz="xl">
        {showYearInTitle && year ? `${title} (${year})` : title}
      </Text>
      <Text fz="md">{subtitle}</Text>
      {creators?.length ? (
        <Text fz="lg">by {formatPeople(creators)}</Text>
      ) : null}
      {starring?.length ? (
        <Text fz="lg">starring {formatPeople(starring)}</Text>
      ) : null}
      <SearchResultButtons
        nextText="Read next"
        currentlyText="Currently reading"
        handleAddShelfClick={handleAddShelfClick}
        handleAddNextClick={handleAddNextClick}
        handleRatingChange={handleRatingChange}
        handleAddCurrentClick={handleAddCurrentClick}
      ></SearchResultButtons>
    </div>
  );
};

export default SearchResult;

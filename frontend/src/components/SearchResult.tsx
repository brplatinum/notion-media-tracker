import { Image, Text } from "@mantine/core";
import {
  addBookToNotion,
  addCurrentBookToNotion,
  addFinishedBookToNotion,
  addNextBookToNotion,
} from "../services/books-service";
import SearchResultButtons from "./SearchResultButtons";

const formatCreators = (creators: string[]) => {
  if (creators.length === 1) return creators[0];
  if (creators.length === 2) return `${creators[0]} and ${creators[1]}`;

  let authorsOutput = "";

  for (let i = 0; i < authorsOutput.length - 1; i++) {
    authorsOutput += `${creators[i]},`;
  }

  return `${authorsOutput} and ${creators[creators.length - 1]}`;
};

type SearchResultProps = {
  title: string;
  subtitle?: string;
  creators?: string[];
  imgSrc?: string;
  genres?: string[];
  ids: string[];
  year?: string;
};

const SearchResult = ({
  title,
  subtitle,
  creators,
  imgSrc,
  genres,
  ids,
  year,
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
      <Text fz="xl">{title}</Text>
      <Text fz="md">{subtitle}</Text>
      {creators ? <Text fz="lg">by {formatCreators(creators)}</Text> : null}
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

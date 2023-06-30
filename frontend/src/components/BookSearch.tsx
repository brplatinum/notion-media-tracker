import { components } from "@backend/types/api";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import {
  addBookToNotion,
  addCurrentBookToNotion,
  addFinishedBookToNotion,
  addNextBookToNotion,
  searchBooks,
} from "../services/books-service";
import { MediaInfo } from "../types/util";
import SearchResult from "./SearchResult";

type Book = components["schemas"]["Book"];

const convertBookInfoToMediaInfo = (bookInfo: Book): MediaInfo => {
  return {
    title: bookInfo.title,
    subtitle: bookInfo.subtitle,
    creators: bookInfo.authors,
    imgSrc: bookInfo.imgSrc,
    genres: bookInfo.genres,
    ids: bookInfo.ids,
    year: bookInfo.year,
  };
};

const convertMediaInfoToBookInfo = (mediaInfo: MediaInfo): Book => {
  return {
    title: mediaInfo.title,
    subtitle: mediaInfo.subtitle,
    authors: mediaInfo.creators,
    imgSrc: mediaInfo.imgSrc,
    genres: mediaInfo.genres,
    ids: mediaInfo.ids,
    year: mediaInfo.year,
  };
};

const BookSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [retrievedBooks, setRetrievedBooks] = useState<Book[]>([]);

  const handleSearchClick = async () => {
    const books = await searchBooks(inputValue);
    setRetrievedBooks(books);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleAddShelfClick = (mediaInfo: MediaInfo) => {
    addBookToNotion(convertMediaInfoToBookInfo(mediaInfo));
  };

  const handleAddNextClick = (mediaInfo: MediaInfo) => {
    addNextBookToNotion(convertMediaInfoToBookInfo(mediaInfo));
  };

  const handleRatingChange = (mediaInfo: MediaInfo, rating: number) => {
    addFinishedBookToNotion(convertMediaInfoToBookInfo(mediaInfo), rating);
  };

  const handleAddCurrentClick = (mediaInfo: MediaInfo) => {
    addCurrentBookToNotion(convertMediaInfoToBookInfo(mediaInfo));
  };

  return (
    <div>
      <Input
        placeholder="Search for books"
        rightSection={
          <div>
            <IconSearch
              size={18}
              style={{ display: "block", opacity: 0.5 }}
              onClick={handleSearchClick}
              cursor="pointer"
            />
          </div>
        }
        size="lg"
        onChange={handleSearchChange}
        onKeyDown={handleEnterPress}
      />
      {retrievedBooks.map((bookResult) => {
        return (
          <SearchResult
            mediaInfo={convertBookInfoToMediaInfo(bookResult)}
            key={`${Math.random()}`}
            nextText="Read next"
            currentlyText="Currently reading"
            onAddShelfClick={handleAddShelfClick}
            onAddNextClick={handleAddNextClick}
            onRatingChange={handleRatingChange}
            onAddCurrentClick={handleAddCurrentClick}
          />
        );
      })}
    </div>
  );
};

export default BookSearch;

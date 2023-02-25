import { BookInfo } from "@backend/types/books-api";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { searchBooks } from "../services/books-service";
import SearchResult from "./SearchResult";

const BookSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [retrievedBooks, setRetrievedBooks] = useState<BookInfo[]>([]);

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
            title={bookResult.title}
            subtitle={bookResult.subtitle}
            authors={bookResult.authors}
            imgSrc={bookResult.imgSrc}
            genres={bookResult.genres}
            ids={bookResult.ids}
            year={bookResult.year}
            key={`${Math.random()}`}
          />
        );
      })}
    </div>
  );
};

export default BookSearch;

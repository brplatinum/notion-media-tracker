import { BookInfo } from "@backend/types/books-api";
import { Input, SegmentedControl } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult";
import { searchBooks } from "./services/books-service";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [retrievedBooks, setRetrievedBooks] = useState<BookInfo[]>([]);
  const [mediaType, setMediaType] = useState("books");

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

  const handleMediaTypeChange = (mediaType: string) => {
    setMediaType(mediaType);
  };

  return (
    <div className="App">
      <SegmentedControl
        data={[
          { label: "Books", value: "books" },
          { label: "Movies", value: "movies" },
          { label: "TV Shows", value: "tv" },
        ]}
        defaultValue={mediaType}
        onChange={handleMediaTypeChange}
      />
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
}

export default App;

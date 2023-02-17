import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./App.css";
import SearchResult from "./components/SearchResult";
import { searchBooks } from "./services/google-books-service";
import { SearchResultInfo } from "@backend/types/books-api";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [retrievedBooks, setRetrievedBooks] = useState<SearchResultInfo[]>([]);

  const handleSearchClick = async () => {
    const books = await searchBooks(inputValue);

    console.log(books);

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
    <div className="App">
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
            key={`${Math.random()}`}
          />
        );
      })}
    </div>
  );
}

export default App;

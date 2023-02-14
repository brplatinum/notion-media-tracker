import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./App.css";
import SearchResult from "./components/SearchResult";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchClick = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`,
      {
        method: "GET",
      }
    );

    const books = await response.json();

    console.log(books.items[0]);

    setSearchValue(books.items[0].volumeInfo.imageLinks.thumbnail);
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
      {searchValue !== "" ? <SearchResult imgSrc={searchValue} /> : null}
    </div>
  );
}

export default App;

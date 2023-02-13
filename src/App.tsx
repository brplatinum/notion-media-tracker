import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`,
      {
        method: "GET",
      }
    );

    const books = await response.json();

    console.log(
      `${books.items[0].volumeInfo["title"]} by ${books.items[0].volumeInfo["authors"][0]}`
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
      />
      <Button>Settings</Button>
    </div>
  );
};

export default App;

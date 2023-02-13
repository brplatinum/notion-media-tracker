import { Button, Input } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    console.log(inputValue);
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
              onClick={handleSearch}
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

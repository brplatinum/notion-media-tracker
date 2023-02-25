import { MovieInfo } from "@backend/types/movies-api";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { searchMovies } from "../services/movies-service";
import SearchResult from "./SearchResult";

const MovieSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [retrievedMovies, setRetrievedMovies] = useState<MovieInfo[]>([]);

  const handleSearchClick = async () => {
    const books = await searchMovies(inputValue);
    setRetrievedMovies(books);
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
        placeholder="Search for movies"
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
      {retrievedMovies.map((movieResult) => {
        return (
          <SearchResult
            title={movieResult.title}
            creators={movieResult.directors}
            imgSrc={movieResult.imgSrc}
            ids={movieResult.ids}
            year={movieResult.year}
            key={`${Math.random()}`}
          />
        );
      })}
    </div>
  );
};

export default MovieSearch;

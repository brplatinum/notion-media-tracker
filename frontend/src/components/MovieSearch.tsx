import { MovieInfo } from "@backend/types/movies-api";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import {
  addCurrentMovieToNotion,
  addFinishedMovieToNotion,
  addMovieToNotion,
  addNextMovieToNotion,
  searchMovies,
} from "../services/movies-service";
import { MediaInfo } from "../types/util";
import SearchResult from "./SearchResult";

const convertMovieInfoToMediaInfo = (movieInfo: MovieInfo): MediaInfo => {
  return {
    title: movieInfo.title,
    creators: movieInfo.directors,
    starring: movieInfo.starring,
    imgSrc: movieInfo.imgSrc,
    ids: movieInfo.ids,
    year: movieInfo.year,
  };
};

const convertMediaInfoToMovieInfo = (mediaInfo: MediaInfo): MovieInfo => {
  return {
    title: mediaInfo.title,
    directors: mediaInfo.creators,
    starring: mediaInfo.starring,
    imgSrc: mediaInfo.imgSrc,
    ids: mediaInfo.ids,
    year: mediaInfo.year,
  };
};

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

  const handleAddShelfClick = (mediaInfo: MediaInfo) => {
    addMovieToNotion(convertMediaInfoToMovieInfo(mediaInfo));
  };

  const handleAddNextClick = (mediaInfo: MediaInfo) => {
    addNextMovieToNotion(convertMediaInfoToMovieInfo(mediaInfo));
  };

  const handleRatingChange = (mediaInfo: MediaInfo, rating: number) => {
    addFinishedMovieToNotion(convertMediaInfoToMovieInfo(mediaInfo), rating);
  };

  const handleAddCurrentClick = (mediaInfo: MediaInfo) => {
    addCurrentMovieToNotion(convertMediaInfoToMovieInfo(mediaInfo));
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
            mediaInfo={convertMovieInfoToMediaInfo(movieResult)}
            key={`${Math.random()}`}
            showYearInTitle
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

export default MovieSearch;

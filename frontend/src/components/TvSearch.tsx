import { components } from "@backend/types/api";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import {
  addCurrentTvToNotion,
  addFinishedTvToNotion,
  addNextTvToNotion,
  addTvToNotion,
  searchTv,
} from "../services/tv-service";
import { MediaInfo } from "../types/util";
import SearchResult from "./SearchResult";

type TvShow = components["schemas"]["TvShow"];

const convertTvInfoToMediaInfo = (tvInfo: TvShow): MediaInfo => {
  return {
    title: tvInfo.title,
    creators: tvInfo.creators,
    starring: tvInfo.starring,
    imgSrc: tvInfo.imgSrc,
    ids: tvInfo.ids,
    year: tvInfo.year,
    genres: tvInfo.genres,
  };
};

const convertMediaInfoToTvInfo = (mediaInfo: MediaInfo): TvShow => {
  return {
    title: mediaInfo.title,
    creators: mediaInfo.creators,
    starring: mediaInfo.starring,
    imgSrc: mediaInfo.imgSrc,
    ids: mediaInfo.ids,
    year: mediaInfo.year,
    genres: mediaInfo.genres,
  };
};

const TvSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [retrievedTvShows, setRetrievedTvShows] = useState<TvShow[]>([]);

  const handleSearchClick = async () => {
    setRetrievedTvShows(await searchTv(inputValue));
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
    addTvToNotion(convertMediaInfoToTvInfo(mediaInfo));
  };

  const handleAddNextClick = (mediaInfo: MediaInfo) => {
    addNextTvToNotion(convertMediaInfoToTvInfo(mediaInfo));
  };

  const handleRatingChange = (mediaInfo: MediaInfo, rating: number) => {
    addFinishedTvToNotion(convertMediaInfoToTvInfo(mediaInfo), rating);
  };

  const handleAddCurrentClick = (mediaInfo: MediaInfo) => {
    addCurrentTvToNotion(convertMediaInfoToTvInfo(mediaInfo));
  };

  return (
    <div>
      <Input
        placeholder="Search for TV shows"
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
      {retrievedTvShows.map((tvResult) => {
        return (
          <SearchResult
            mediaInfo={convertTvInfoToMediaInfo(tvResult)}
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

export default TvSearch;

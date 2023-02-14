import { Image } from "@mantine/core";
import { FC, useState } from "react";
import { SearchResultInfo } from "../types";

const SearchResult: FC<SearchResultInfo> = ({
  title,
  subtitle,
  authors,
  imgSrc,
}) => {
  return (
    <div className="SearchResult">
      <Image
        width={100}
        radius="md"
        src={imgSrc}
        fit="contain"
        withPlaceholder
      />
    </div>
  );
};

export default SearchResult;

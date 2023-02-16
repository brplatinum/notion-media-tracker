import { Image, Text } from "@mantine/core";
import { FC, useState } from "react";
import { SearchResultInfo } from "../types";

const formatAuthors = (authors: string[]) => {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  let authorsOutput = "";

  for (let i = 0; i < authorsOutput.length - 1; i++) {
    authorsOutput += `${authors[i]},`;
  }

  return `${authorsOutput} and ${authors[authors.length - 1]}`;
};

const SearchResult: FC<SearchResultInfo> = ({
  title,
  subtitle,
  authors,
  imgSrc,
}) => {
  return (
    <div className="SearchResult">
      <Image
        width={120}
        radius="md"
        src={imgSrc}
        fit="contain"
        withPlaceholder
      />
      <Text fz="xl">{title}</Text>
      <Text fz="md">{subtitle}</Text>
      <Text fz="md">{title}</Text>
      {authors ? <Text fz="lg">by {formatAuthors(authors)}</Text> : null}
    </div>
  );
};

export default SearchResult;

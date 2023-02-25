import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import "./App.css";
import BookSearch from "./components/BookSearch";
import MovieSearch from "./components/MovieSearch";
import TvSearch from "./components/TvSearch";

function App() {
  const [mediaType, setMediaType] = useState("books");

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
      {(() => {
        switch (mediaType) {
          case "books":
            return <BookSearch></BookSearch>;
          case "movies":
            return <MovieSearch></MovieSearch>;
          case "tv":
            return <TvSearch></TvSearch>;
        }
      })()}
    </div>
  );
}

export default App;

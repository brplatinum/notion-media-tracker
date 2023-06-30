import { components } from "@backend/types/api";
import {
  Button,
  Group,
  Modal,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import "./App.css";
import BookSearch from "./components/BookSearch";
import MovieSearch from "./components/MovieSearch";
import TvSearch from "./components/TvSearch";
import { getSetupInfo, submitSetupInfo } from "./services/config-service";

type KeysNeeded = components["schemas"]["KeysNeeded"]["keysNeeded"];

function App() {
  const [mediaType, setMediaType] = useState("books");
  const [keysNeeded, setKeysNeeded] = useState([] as KeysNeeded);

  const form = useForm({
    initialValues: {
      notionToken: "",
      notionDbId: "",
      tmdbToken: "",
    },

    validate: {
      notionToken: (value) =>
        keysNeeded?.includes("NOTION_INTEGRATION_TOKEN") && value.length == 0
          ? "Must not be empty"
          : null,
      notionDbId: (value) =>
        keysNeeded?.includes("NOTION_DATABASE_ID") && value.length == 0
          ? "Must not be empty"
          : null,
      tmdbToken: (value) =>
        keysNeeded?.includes("TMDB_TOKEN") && value.length == 0
          ? "Must not be empty"
          : null,
    },
  });

  const handleMediaTypeChange = (mediaType: string) => {
    setMediaType(mediaType);
  };

  const handleSubmit = async (values: typeof form.values) => {
    const keysNeededResponse = await submitSetupInfo(values);
    setKeysNeeded(keysNeededResponse);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSetupInfo();
        setKeysNeeded(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Modal
        opened={keysNeeded?.length != 0}
        onClose={() => {
          null;
        }}
        withCloseButton={false}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          {keysNeeded?.includes("NOTION_INTEGRATION_TOKEN") && (
            <TextInput
              placeholder="Notion integration token..."
              label="Notion Integration Token"
              withAsterisk
              {...form.getInputProps("notionToken")}
            />
          )}
          {keysNeeded?.includes("NOTION_DATABASE_ID") && (
            <TextInput
              placeholder="Notion database id..."
              label="Notion Database ID"
              withAsterisk
              {...form.getInputProps("notionDbId")}
            />
          )}
          {keysNeeded?.includes("TMDB_TOKEN") && (
            <TextInput
              placeholder="TMDB token..."
              label="TMDB Token"
              withAsterisk
              {...form.getInputProps("tmdbToken")}
            />
          )}
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <SegmentedControl
        className="media-type-segment"
        fullWidth
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

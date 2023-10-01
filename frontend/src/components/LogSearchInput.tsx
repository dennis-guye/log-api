import { useState } from "react";
import { DefaultApi } from "../api";
import { errorHandler } from "../utils/ErrorHandler";
import "../styles/LogSearchInput.css";

export const LogSearchInput = ({
  onSearch,
}: {
  onSearch: (args: {
    fileName: string;
    term: string;
    numberOfEntries: number;
  }) => Promise<void>;
}) => {
  const [fileName, setFileName] = useState("");
  const [term, setTerm] = useState("");
  const [numberOfEntries, setNumberOfEntries] = useState("");

  const handleSearch = async () => {
    try {
      await onSearch({
        fileName,
        term,
        numberOfEntries: parseInt(numberOfEntries, 10),
      });
    } catch (e) {
      console.log(e);
      errorHandler(e as Error);
    }
  };

  return (
    <div className="SearchInput">
      <label htmlFor="fileName">File Name:</label>
      <input
        type="text"
        id="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />

      <label htmlFor="term">Search Term:</label>
      <input
        type="text"
        id="term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      <label htmlFor="numberOfEntries">Number of Entries:</label>
      <input
        type="number"
        id="numberOfEntries"
        value={numberOfEntries}
        onChange={(e) => setNumberOfEntries(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

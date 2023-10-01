import { useState } from "react";
import { DefaultApi } from "../api";
import { LogSearchInput } from "./LogSearchInput";
import { LogResultView } from "./LogResultView";
import "../styles/LogSearchView.css";

const api = new DefaultApi();

export const LogSearchView = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const onSearch = async ({
    fileName,
    term,
    numberOfEntries,
  }: {
    fileName: string;
    term: string;
    numberOfEntries: number;
  }) => {
    console.log(fileName);
    const result = await api.tail(fileName, term, numberOfEntries, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
    console.log(result);
    setLogs(result.data.data);
  };

  return (
    <div className="SearchView">
      <LogSearchInput onSearch={onSearch}></LogSearchInput>
      <LogResultView logs={logs}></LogResultView>
    </div>
  );
};

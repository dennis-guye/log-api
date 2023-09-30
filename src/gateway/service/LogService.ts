import { StatusError } from "../../utils";
import { ILogService } from "../contoller/LogController";
import fs from "fs/promises";

export class LogService implements ILogService {
  constructor(readonly rootDir = "/var/log") {}

  tail: ({
    file,
    searchTerm,
    n,
  }: {
    file: string;
    searchTerm: string;
    n: number;
  }) => Promise<string[]> = async ({ file, n, searchTerm }) => {
    if (!file.endsWith(".log") && !file.endsWith(".out")) {
      throw new StatusError(
        "Invalid File Type - Only *.log and *.out allowed",
        400,
        "Bad Request"
      );
    }
    // check if file exists using fs#stats
    const fileHandle = await fs.open(`${this.rootDir}/${file}`);
    // Space is O(m)
    const result: string[] = [];

    try {
      // assume that the file encoding is utf-8
      // consider checking bytes for encoding
      // time is O(mn)
      for await (const lines of fileHandle.readLines({})) {
        if (lines.includes(searchTerm)) {
          result.push(lines);
        }

        if (result.length > n) {
          // This is O(n) -> to fix this we would need to implement queue semantics
          result.shift();
        }
      }
      return result;
    } catch {
      throw new StatusError("Server Error", 500, "");
    } finally {
      fileHandle.close();
    }
  };
}

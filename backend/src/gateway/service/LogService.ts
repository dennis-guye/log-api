import { StatusError } from "../../utils";
import { ILogService } from "../contoller/LogController";
import fs from "fs/promises";
import pino, { Logger } from "pino";

export class LogService implements ILogService {
  constructor(
    readonly logger: Logger = pino(),
    readonly rootDir = "/var/log"
  ) {}

  tail: ({
    file,
    searchTerm,
    n,
  }: {
    file: string;
    searchTerm: string;
    n: number;
  }) => Promise<string[]> = async ({ file, n, searchTerm }) => {
    const logger = this.logger.child({ file, searchTerm, n });
    logger.info("Tailing file");

    if (!file.endsWith(".log") && !file.endsWith(".out")) {
      logger.debug("Not a valid file");
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
      logger.debug("Reading file");
      // assume that the file encoding is utf-8
      // consider checking bytes for encoding
      // time is O(mn)
      for await (const lines of fileHandle.readLines({})) {
        if (lines.includes(searchTerm)) {
          logger.debug("Matched search term");
          result.push(lines);
        }

        if (result.length > n) {
          logger.debug("Exceeded size, dropping oldest value");
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

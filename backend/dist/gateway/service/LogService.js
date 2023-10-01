"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const utils_1 = require("../../utils");
const promises_1 = __importDefault(require("fs/promises"));
const pino_1 = __importDefault(require("pino"));
class LogService {
    logger;
    rootDir;
    constructor(logger = (0, pino_1.default)(), rootDir = "/var/log") {
        this.logger = logger;
        this.rootDir = rootDir;
    }
    tail = async ({ file, n, searchTerm }) => {
        const logger = this.logger.child({ file, searchTerm, n });
        logger.info("Tailing file");
        if (!file.endsWith(".log") && !file.endsWith(".out")) {
            logger.debug("Not a valid file");
            throw new utils_1.StatusError("Invalid File Type - Only *.log and *.out allowed", 400, "Bad Request");
        }
        // check if file exists using fs#stats
        const fileHandle = await promises_1.default.open(`${this.rootDir}/${file}`);
        // Space is O(m)
        const result = [];
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
        }
        catch {
            throw new utils_1.StatusError("Server Error", 500, "");
        }
        finally {
            fileHandle.close();
        }
    };
}
exports.LogService = LogService;

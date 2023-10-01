"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LogService_1 = require("./service/LogService");
const LogController_1 = require("./contoller/LogController");
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const pino_1 = require("pino");
const pino_http_1 = __importDefault(require("pino-http"));
const cors_1 = __importDefault(require("cors"));
const logger = (0, pino_1.pino)({ level: "info" });
const logHandler = (0, pino_http_1.default)();
const main = async () => {
    const service = new LogService_1.LogService();
    const controller = new LogController_1.LogController(service);
    const app = (0, express_1.default)();
    app.use(logHandler);
    app.use((0, cors_1.default)());
    app.route("/v1/var/log/:file").get(controller.GET);
    app.use(ErrorHandler_1.handler);
    app.listen(8080);
};
void (async () => {
    try {
        await main();
    }
    catch (e) {
        logger.error({ error: e }, "Server crashed unexpectedly");
    }
})();

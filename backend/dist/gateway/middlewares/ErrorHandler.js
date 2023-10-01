"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("../../utils");
const pino_1 = require("pino");
const logger = (0, pino_1.pino)();
const handler = (err, req, res, next) => {
    logger.error({ error: err });
    if ((0, utils_1.hasOwnProperty)(err, "status") && (0, utils_1.hasOwnProperty)(err, "code")) {
        res
            .status(err.code)
            .send({ message: err.status, code: err.code, cause: err.message });
    }
    else {
        res.status(500).send({ message: "SERVER ERROR", code: 500 });
    }
};
exports.handler = handler;

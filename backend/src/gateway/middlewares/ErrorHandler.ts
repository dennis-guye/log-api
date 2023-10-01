import { ErrorRequestHandler } from "express";
import { hasOwnProperty } from "../../utils";
import { pino } from "pino";
const logger = pino();

export const handler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error({ error: err });
  if (hasOwnProperty(err, "status") && hasOwnProperty(err, "code")) {
    res
      .status(err.code)
      .send({ message: err.status, code: err.code, cause: err.message });
  } else {
    res.status(500).send({ message: "SERVER ERROR", code: 500 });
  }
};

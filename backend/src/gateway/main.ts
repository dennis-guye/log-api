import e, { Application, Request, Response } from "express";
import { LogService } from "./service/LogService";
import { LogController } from "./contoller/LogController";
import { handler } from "./middlewares/ErrorHandler";
import { pino } from "pino";
import PinoHttp from "pino-http";
import cors from "cors";

const logger = pino({ level: "info" });
const logHandler = PinoHttp();
const main = async () => {
  const service = new LogService();
  const controller = new LogController(service);
  const app = e();
  app.use(logHandler);
  app.use(cors());
  app.route("/v1/var/log/:file").get(controller.GET);
  app.use(handler);
  app.listen(8080);
};

void (async () => {
  try {
    await main();
  } catch (e) {
    logger.error({ error: e }, "Server crashed unexpectedly");
  }
})();

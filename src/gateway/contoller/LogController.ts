import { RequestHandler } from "express";
import { hasOwnProperty } from "../../utils";

export interface ILogService {
  tail: ({
    file,
    searchTerm,
    n,
  }: {
    file: string;
    searchTerm: string;
    n: number;
  }) => Promise<string[]>;
}

export class LogController {
  constructor(private readonly service: ILogService) {}

  GET: RequestHandler = async (req, res, next) => {
    try {
      let file = req.params["file-name"];
      let searchTerm = req.query.term as string;
      let n = parseInt(req.query["number-of-entries"] as string);
      res.send({
        message: "OK",
        code: 200,
        data: await this.service.tail({ file, searchTerm, n }),
      });
    } catch (e) {
      next(e);
    }
  };
}

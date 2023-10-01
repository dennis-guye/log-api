"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
class LogController {
    service;
    constructor(service) {
        this.service = service;
    }
    GET = async (req, res, next) => {
        try {
            let file = req.params["file"];
            let searchTerm = req.query.term;
            let n = parseInt(req.query["number-of-entries"]);
            res.status(200).send({
                message: "OK",
                code: 200,
                data: await this.service.tail({ file, searchTerm, n }),
            });
        }
        catch (e) {
            next(e);
        }
    };
}
exports.LogController = LogController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogService_1 = require("../LogService");
const promises_1 = __importDefault(require("fs/promises"));
const chai = require("chai");
const pino_1 = require("pino");
describe("LogService", function () {
    this.timeout(10000);
    const service = new LogService_1.LogService((0, pino_1.pino)(), ".");
    const text0 = "INFO HELLO THERE";
    const text1 = "WARN GENERAL KENOBI";
    const text2 = "INFO ONLY SITHS DEAL IN ABSOLUTES";
    const text = [text0, text1, text2].join("\n") + "\n";
    this.beforeAll(async function () {
        for (let i = 0; i < 10; i++)
            await promises_1.default.appendFile("./test.log", text);
    });
    this.afterAll(async function () {
        await promises_1.default.unlink("./test.log");
    });
    it("should tail most recent entry", async function () {
        const res = await service.tail({
            file: "test.log",
            searchTerm: "INFO",
            n: 1,
        });
        chai.expect(res).to.deep.eq([text2]);
    });
    it("should tail most recent entry", async function () {
        const res = await service.tail({
            file: "test.log",
            searchTerm: "INFO",
            n: 3,
        });
        chai.expect(res).to.deep.eq([text2, text0, text2]);
    });
    it("should throw if file does not exist", async function () {
        try {
            const res = await service.tail({
                file: "test.log1",
                searchTerm: "INFO",
                n: 3,
            });
            chai.should().fail();
        }
        catch (e) { }
    });
    it("should throw if file is compressed", async function () {
        try {
            const res = await service.tail({
                file: "test.log.gz",
                searchTerm: "INFO",
                n: 3,
            });
            chai.should().fail();
        }
        catch (e) { }
    });
});

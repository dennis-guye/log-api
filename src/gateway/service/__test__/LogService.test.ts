import { LogService } from "../LogService";
import fs from "fs/promises";
import chai = require("chai");
import { pino } from "pino";

describe("LogService", function () {
  this.timeout(10000);

  const service = new LogService(pino(), ".");
  const text0 = "INFO HELLO THERE";
  const text1 = "WARN GENERAL KENOBI";
  const text2 = "INFO ONLY SITHS DEAL IN ABSOLUTES";
  const text = [text0, text1, text2].join("\n") + "\n";
  this.beforeAll(async function () {
    for (let i = 0; i < 10; i++) await fs.appendFile("./test.log", text);
  });
  this.afterAll(async function () {
    await fs.unlink("./test.log");
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
    } catch (e) {}
  });
  it("should throw if file is compressed", async function () {
    try {
      const res = await service.tail({
        file: "test.log.gz",
        searchTerm: "INFO",
        n: 3,
      });
      chai.should().fail();
    } catch (e) {}
  });
});

import { LogLevel } from "../../../src/api/log";
import { getLogLevelToString } from "../../../src/util/log";

describe("util/log", () => {
  describe("getLogLevelToString", () => {
    it("returns the string representation of a LogLevel enum", () => {
      expect(getLogLevelToString(LogLevel.INFO)).toStrictEqual("INFO");
    });
  });
});

import { SeverityNumber } from "@opentelemetry/api-logs";
import { LogLevel } from "../../../src/api/log";
import { getMappedSeverityNumber } from "../../../src/implementation/log";

describe("implementation/log", () => {
  describe("getMappedSeverityNumber", () => {
    it("returns the correct mapped severity number", () => {
      expect(getMappedSeverityNumber(LogLevel.INFO)).toStrictEqual(SeverityNumber.INFO);
    });
  });
});
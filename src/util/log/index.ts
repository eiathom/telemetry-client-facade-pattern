import { LogLevel } from "../../api/log";

export const getLogLevelToString = (
  logLevel: LogLevel | undefined,
  defaultValue: LogLevel = LogLevel.INFO,
): string => (logLevel ? LogLevel[logLevel] : LogLevel[defaultValue]);

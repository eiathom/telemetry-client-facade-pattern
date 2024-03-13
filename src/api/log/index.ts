import { Attributes } from "../common";

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

export interface LogRecord {
  message: string;
  level?: LogLevel;
  attributes?: Attributes;
}

export interface Logger {
  log: (logRecord: LogRecord) => void;
}

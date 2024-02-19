import api, { Logger, SeverityNumber } from "@opentelemetry/api-logs";

import { LogLevel, LogRecord } from "../../api/log";
import { AbstractLogger } from "../../sdk/log";
import { TelemetryConfiguration } from "../../common";
import { getLogLevelToString } from "../../util/log";

const DEFAULT_NAME = "opentelemetry-logger";

export const getMappedSeverityNumber = (
    logLevel: LogLevel | undefined,
    defaultValue: SeverityNumber = SeverityNumber.INFO): number => {
  if (logLevel) {
    const index = Object.keys(SeverityNumber).indexOf(LogLevel[logLevel]);
    return index === -1 ? defaultValue : Object.values(SeverityNumber)[index] as number;
  }
  return defaultValue;
}

export class OpenTelemetryLogger extends AbstractLogger {
  private logger: Logger;
  constructor(protected readonly configuration: TelemetryConfiguration) {
    super(configuration);
    this.logger = api.logs.getLogger(super.configuration.name ?? DEFAULT_NAME);
  }
  public log(logRecord: LogRecord): void {
    this.logger.emit({
      attributes: logRecord.attributes,
      body: logRecord.message,
      severityText: getLogLevelToString(logRecord.level),
      severityNumber: getMappedSeverityNumber(logRecord.level),
    });
  }
}

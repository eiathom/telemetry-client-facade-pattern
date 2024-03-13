import { LogRecord, Logger } from "../../api/log";
import { TelemetryConfiguration } from "../../common";

export abstract class AbstractLogger implements Logger {
  constructor(protected readonly configuration: TelemetryConfiguration) {}
  public abstract log(logRecord: LogRecord): void;
}

export class TelemetryLogger implements Logger {
  constructor(private readonly logger: AbstractLogger) {}
  public log(logRecord: LogRecord): void {
    // TODO: validation && sanitisation && scrubbing of attributes
    this.logger.log(logRecord);
  }
}

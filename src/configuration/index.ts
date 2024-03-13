import { LogLevel } from "../api/log";
import {
  getParsedArrayTypeValues,
  getStringValueAsArray,
  parseBoolean,
} from "../util";

export const ENVIRONMENT_VARIABLE_PREFIX = "TELEMETRY";

export const ENVIRONMENT_VARIABLE_PREFIX_SEPARATOR = "_";

export const ARRAY_TYPE_IDENTIFIER = "[]";

export type ConfigurationReturnType =
  | DiagnosticConfiguration
  | LogConfiguration
  | MetricConfiguration
  | TraceConfiguration;

export enum LogEnvironmentVariable {
  LOG_LEVEL = "LOG_LEVEL",
  IMPLEMENTATION = "IMPLEMENTATION",
}

export enum DiagnosticEnvironmentVariable {
  DIAGNOSTIC_LEVEL = "DIAGNOSTIC_LEVEL",
}

export enum Implementation {
  OTEL = "OTEL",
  POWERTOOLS = "POWERTOOLS",
}

export enum ConfigurationType {
  LOG = "log",
  METRIC = "metric",
  TRACE = "trace",
  DIAGNOSTIC = "diagnostic",
}

export enum EnvironmentVariableType {
  STRING = "string",
  INTEGER = "integer",
  DECIMAL = "decimal",
  BOOLEAN = "boolean",
  ARRAY_STRING = `string${ARRAY_TYPE_IDENTIFIER}`,
  ARRAY_INTEGER = `number${ARRAY_TYPE_IDENTIFIER}`,
  ARRAY_DECIMAL = `float${ARRAY_TYPE_IDENTIFIER}`,
  ARRAY_BOOLEAN = `boolean${ARRAY_TYPE_IDENTIFIER}`,
}

export interface EnvironmentVariableTypeToType {
  [EnvironmentVariableType.STRING]: string;
  [EnvironmentVariableType.INTEGER]: number;
  [EnvironmentVariableType.DECIMAL]: number;
  [EnvironmentVariableType.BOOLEAN]: boolean;
  [EnvironmentVariableType.ARRAY_STRING]: Array<string>;
  [EnvironmentVariableType.ARRAY_INTEGER]: Array<number>;
  [EnvironmentVariableType.ARRAY_DECIMAL]: Array<number>;
  [EnvironmentVariableType.ARRAY_BOOLEAN]: Array<boolean>;
}

export interface ConfigurationValue<T = unknown> {
  value: T;
  environmentVariableName: string;
  converter: (environmentValue: string) => T;
}

export interface BaseConfiguration {
  supportedImplementations: Array<Implementation>;
  implementation: ConfigurationValue<string>;
}

export interface DiagnosticConfiguration {
  diagnosticLevel: ConfigurationValue<LogLevel>;
}

export interface LogConfiguration extends BaseConfiguration {
  logLevel: ConfigurationValue<LogLevel>;
}

export interface MetricConfiguration {}
export interface TraceConfiguration {}

export interface Configuration {
  [ConfigurationType.DIAGNOSTIC]: DiagnosticConfiguration;
  [ConfigurationType.LOG]: LogConfiguration;
  [ConfigurationType.METRIC]: MetricConfiguration;
  [ConfigurationType.TRACE]: TraceConfiguration;
}

export const getTypedValue = (
  environmentVariableType: EnvironmentVariableType,
  value: string,
  defaultValue: EnvironmentVariableTypeToType[EnvironmentVariableType],
): EnvironmentVariableTypeToType[EnvironmentVariableType] => {
  try {
    if (environmentVariableType.includes(ARRAY_TYPE_IDENTIFIER)) {
      const values = getStringValueAsArray(value);
      if (environmentVariableType === EnvironmentVariableType.ARRAY_INTEGER) {
        return getParsedArrayTypeValues(
          values,
          parseInt,
        ) as EnvironmentVariableTypeToType[EnvironmentVariableType];
      }
      if (environmentVariableType === EnvironmentVariableType.ARRAY_DECIMAL) {
        return getParsedArrayTypeValues(
          values,
          parseFloat,
        ) as EnvironmentVariableTypeToType[EnvironmentVariableType];
      }
      if (environmentVariableType === EnvironmentVariableType.ARRAY_BOOLEAN) {
        return getParsedArrayTypeValues(
          values,
          parseBoolean,
        ) as EnvironmentVariableTypeToType[EnvironmentVariableType];
      }
    }
  } catch (error) {
    // TODO: log that default value will be returned
  }
  return defaultValue;
};

export const getEnvironmentVariableNameWithPrefix = (name: string): string => {
  return `${ENVIRONMENT_VARIABLE_PREFIX}${ENVIRONMENT_VARIABLE_PREFIX_SEPARATOR}${name}`;
};

const defaultConfiguration: Configuration = {
  [ConfigurationType.DIAGNOSTIC]: {
    diagnosticLevel: {
      value: LogLevel.ERROR,
      environmentVariableName: getEnvironmentVariableNameWithPrefix(
        DiagnosticEnvironmentVariable.DIAGNOSTIC_LEVEL,
      ),
      converter: (environmentValue: string): LogLevel => {
        return LogLevel[
          environmentValue.toUpperCase() as keyof typeof LogLevel
        ];
      },
    },
  },
  [ConfigurationType.LOG]: {
    implementation: {
      value: Implementation.OTEL,
      environmentVariableName: getEnvironmentVariableNameWithPrefix(
        LogEnvironmentVariable.IMPLEMENTATION,
      ),
      converter: (environmentValue: string): Implementation => {
        return Implementation[
          environmentValue.toUpperCase() as keyof typeof Implementation
        ];
      },
    },
    supportedImplementations: [Implementation.OTEL],
    logLevel: {
      value: LogLevel.INFO,
      environmentVariableName: getEnvironmentVariableNameWithPrefix(
        LogEnvironmentVariable.LOG_LEVEL,
      ),
      converter: (environmentValue: string): LogLevel => {
        return LogLevel[
          environmentValue.toUpperCase() as keyof typeof LogLevel
        ];
      },
    },
  },
  [ConfigurationType.METRIC]: {},
  [ConfigurationType.TRACE]: {},
};

export const getDefaultTelemetryConfiguration = (
  configurationType: ConfigurationType,
): ConfigurationReturnType => {
  return defaultConfiguration[configurationType];
};

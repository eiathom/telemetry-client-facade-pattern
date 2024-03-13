import { AttributeValue } from "../api/common";

export interface ClientConfiguration {}

export interface TelemetryConfiguration {
  name?: string;
}

export const isAttributeKeyValid = (
  attributeKey: string | undefined,
): boolean => {
  return false;
};

export const isAttributeValueValid = (
  attributeValue: AttributeValue | undefined,
): boolean => {
  return false;
};

export const getSanitisedAttributeKey = (
  attributeKey: string | undefined,
): string | undefined => {
  return attributeKey;
};

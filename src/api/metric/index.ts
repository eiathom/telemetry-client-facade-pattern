import { Attributes } from "../common";

export interface Meter {
  incrementIntegerCounter: (name: string, attributes?: Attributes) => void;
  incrementIntegerCounterWithValue: (
    name: string,
    value: number,
    attributes?: Attributes,
  ) => void;
}

import { sum } from "../src";

describe("index", () => {
  describe("sum", () => {
    it.each([
      { firstNumber: 1, secondNumber: 2, expectedResult: 3 },
      { firstNumber: -2, secondNumber: 2, expectedResult: 0 },
      { firstNumber: 1, secondNumber: -2, expectedResult: -1 },
    ])(
      `given firstNumber: $firstNumber and secondNumber: $secondNumber, expect the result to be: $expectedResult`,
      async ({ firstNumber, secondNumber, expectedResult }) => {
        expect(sum(firstNumber, secondNumber)).toStrictEqual(expectedResult);
      },
    );
  });
});

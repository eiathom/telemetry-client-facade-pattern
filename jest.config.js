module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: false,
  verbose: false,
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

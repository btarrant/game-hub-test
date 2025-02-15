module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: [
      "/node_modules/",
      "<rootDir>/src/__tests__/__deprecatedTests__/",
      "<rootDir>/src/__tests__/__mocks__/"
    ],
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
      },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
    moduleNameMapper: {
      '^react$': '<rootDir>/node_modules/react',
      '^react-dom$': '<rootDir>/node_modules/react-dom',
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "/Users/bt-home/Projects/game-hub-tests/src/__tests__/__mocks__/fileMock.js",
    },
  };
  
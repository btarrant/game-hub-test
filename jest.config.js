module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: [
      "/node_modules/",
      "<rootDir>/src/__tests__/__deprecatedTests__/SearchInput.test.tsx"
    ],
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
      },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      '^react$': '<rootDir>/node_modules/react',
      '^react-dom$': '<rootDir>/node_modules/react-dom',
    },
  };
  
module.exports = {
    preset: "ts-jest",
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
  
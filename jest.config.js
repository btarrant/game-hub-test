export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
    testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  };
  
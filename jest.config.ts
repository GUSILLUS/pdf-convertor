const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".(css|less)$": "jest-transform-css",
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__ mocks __/file-mock.js",
    "\\.(css)$": "identity-obj-proxy",
    "use-resize-observer": "use-resize-observer/polyfilled",
  },
  setupFilesAfterEnv: ["<rootDir>/setup-tests.tsx"],
};

export default config;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { diagnostics: false }],
  },
  testMatch: ["**/utils/**/*.(test|spec).(ts|tsx)"],
};

/**
 * Smoke tests run against a live dev server. Next.js compiles a route on first
 * request, which can take 20s+, so the default 5s Jest timeout is far too short.
 */
module.exports = {
  testEnvironment: "node",
  testTimeout: 120000,
  testMatch: ["<rootDir>/tests/**/*.test.js", "<rootDir>/tests/**/*.test.ts"],
  transform: {},
};


module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Add this line to use Babel for transforming JS files
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)", // This allows Jest to transform the axios package
    ],
    testEnvironment: "jsdom", // If you're testing React components, you typically want jsdom
  };
  
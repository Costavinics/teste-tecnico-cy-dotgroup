const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,

  env: {
    KHAN_USERNAME: "testedotgroup@gmail.com",
    KHAN_PASSWORD: "123456teste",
  },

  retries: {
    runMode: 2,
    openMode: 0
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
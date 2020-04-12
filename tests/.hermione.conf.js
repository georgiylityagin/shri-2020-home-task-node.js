module.exports = {
  baseUrl: 'http://127.0.0.1:3005/',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  retry: 3,

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      },
      waitTimeout: 10000
    }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'integration/hermione-html-report'
    }
  }
}
module.exports = {
  baseUrl: 'http://127.0.0.1:3005/',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  // screenshotMode: 'fullpage',
  // screenshotsDir: 'hermione/screens',

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
      path: 'hermione/hermione-html-report'
    }
  }
}
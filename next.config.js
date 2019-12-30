const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withCss(
  withSass({
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 20000 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 20,
    },
  })
);

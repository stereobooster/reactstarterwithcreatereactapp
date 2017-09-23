module.exports = {
  staticFileGlobs: [
    './build/**/**.html',
    './build/images/**.*',
    './build/static/**',
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: './build/service-worker.js',
      // For unknown URLs, fallback to the index page
  navigateFallback: './200.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
  navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  // can add runtime caching code below
  runtimeCaching: [{
      // google storage images
    urlPattern: /^https:\/\/storage.googleapis.com\/.*/,
    handler: 'cacheFirst'
    }],
  stripPrefix: './build'
}
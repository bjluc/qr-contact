module.exports = {
  // ... other config options
  reactStrictMode: true,
  // Disable caching in development
  onDemandEntries: {
    maxInactiveAge: 0,
    pagesBufferLength: 0,
  },
  productionBrowserSourceMaps: false,
}

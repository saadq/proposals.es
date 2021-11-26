/* eslint-disable @typescript-eslint/no-var-requires */

const withTM = require('next-transpile-modules')(['@proposals.es/ui', '@proposals.es/utils'])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    styledComponents: true
  }
})

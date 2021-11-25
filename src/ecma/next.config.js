/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  '@proposals.es/ui',
  '@proposals.es/utils'
])

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    styledComponents: true
  }
})

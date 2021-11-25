/* eslint-disable @typescript-eslint/no-var-requires */

const withTM = require('next-transpile-modules')(['@common/components'])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    styledComponents: true
  },
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'wasm.proposals.es'
            }
          ],
          destination: '/wasm/:path*'
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.wasm.proposals.es'
            }
          ],
          destination: '/wasm/:path*'
        }
      ]
    }
  }
})

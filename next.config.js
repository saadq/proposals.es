module.exports = {
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
        }
      ]
    }
  }
}

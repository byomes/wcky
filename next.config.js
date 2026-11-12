/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/room',
        destination: '/',
        permanent: false,
      },
      {
        source: '/room/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/arc',
        destination: '/',
        permanent: false,
      },
      {
        source: '/arc/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/theology',
        destination: '/books',
        permanent: true,
      },
      {
        source: '/dreamstone',
        destination: '/books',
        permanent: true,
      },
      {
        source: '/tools/connect-card',
        destination: 'https://wtsn.me/cat/connect',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig

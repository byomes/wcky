const { withMicrofrontends } = require('@vercel/microfrontends/next/config')

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
        source: '/theology',
        destination: '/books',
        permanent: true,
      },
      {
        source: '/dreamstone',
        destination: '/books',
        permanent: true,
      },
    ]
  },
}
module.exports = withMicrofrontends(nextConfig)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: 'http://34.224.208.179:3333',
    JWT_SECRET: 'paçocapaçoquinha'
  }
}

module.exports = nextConfig

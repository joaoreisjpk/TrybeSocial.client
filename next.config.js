/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: 'http://3.221.216.107:3333/',
    JWT_SECRET: 'paçocapaçoquinha'
  }
}

module.exports = nextConfig

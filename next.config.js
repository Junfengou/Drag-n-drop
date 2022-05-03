/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
}
// https://nextjs.org/docs/advanced-features/compiler
module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  nextConfig
}

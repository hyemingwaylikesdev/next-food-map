// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'inflearn-nextjs.vercel.app',
      'search.pstatic.net',
      'ldb-phinf.pstatic.net',
    ], //naver 주소에 관한 도매인 추가
  },
  i18n: {
    /** https://nextjs.org/docs/advanced-features/i18n-routing#getting-started */
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = nextConfig;

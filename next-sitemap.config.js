/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || 'https://mong-sik-hyemingwaylikesdev.vercel.app',
  generateRobotsTxt: true,
};

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    url: 'https://changelog.gatsbyjs.io',
    title: 'Gatsby Changelog',
    image: 'og-image.jpg',
    keywords: ['gatsby', 'gatsbyjs'],
    repo: 'https://github.com/gatsby-inc/changelog'
  },
  plugins: ['gatsby-plugin-postcss']
};

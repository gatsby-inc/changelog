import React, { Fragment } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Seo = () => {
  const {
    site: {
      siteMetadata: { url, title, image, keywords }
    },
    allChangelog: { nodes }
  } = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          url
          title
          image
          keywords
        }
      }
      allChangelog(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { version: { ne: null } } }
        limit: 1
      ) {
        nodes {
          name
          frontmatter {
            date(formatString: "MMMM DD YYYY")
            version
            title
          }
        }
      }
    }
  `);

  const { frontmatter } = nodes[0];

  const seoTitle = `${title} | ${frontmatter.version}`;
  const seoDescription = `${frontmatter.title} | ${frontmatter.date}`;
  const seoImage = `${url}/${image}`;

  return (
    <Fragment>
      {/* Default / HTML */}
      <title>{seoTitle}</title>
      <link rel="canonical" href={url} />

      {/* Primary Meta Tags */}
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="image" content={seoImage} />
      <meta name="keywords" content={keywords ? keywords.join(', ') : null} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* favicon */}
      <link rel="icon" type="image/png" sizes="16x16" href={`${url}/favicon-16x16.png`} data-react-helmet="true" />
      <link rel="icon" type="image/png" sizes="32x32" href={`${url}/favicon-32x32.png`} data-react-helmet="true" />
    </Fragment>
  );
};

export default Seo;

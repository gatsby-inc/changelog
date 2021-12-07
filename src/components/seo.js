import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Helmet from 'react-helmet';

const Seo = () => {
  const {
    site: {
      siteMetadata: { url, title, image, language, keywords }
    },
    allChangelog: { nodes }
  } = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          url
          title
          image
          language
          keywords
        }
      }
      allChangelog(sort: { fields: index, order: DESC }, limit: 1) {
        nodes {
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

  return (
    <Helmet>
      {/* Default / HTML */}
      <html lang={language} />
      <title>{seoTitle}</title>
      <link rel="canonical" href={url} />

      {/* Primary Meta Tags */}
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="image" content={image} />
      <meta name="keywords" content={keywords ? keywords.join(', ') : null} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />

      {/* favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${url}/favicon-16x16.png`}
        data-react-helmet="true"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${url}/favicon-32x32.png`}
        data-react-helmet="true"
      />
    </Helmet>
  );
};

export default Seo;

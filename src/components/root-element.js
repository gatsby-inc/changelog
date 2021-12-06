import React, { Fragment } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Helmet from 'react-helmet';

const RootElement = ({ children }) => {
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
          name
        }
      }
    }
  `);

  console.log(nodes);

  const description = `Gatsby Release: ${nodes[0].name} | tbc`;

  return (
    <Fragment>
      <Helmet>
        {/* Default / HTML */}
        <html lang={language} />
        <title>{title}</title>
        <link rel="canonical" href={url} />

        {/* Primary Meta Tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta name="keywords" content={keywords ? keywords.join(', ') : null} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
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
      {children}
    </Fragment>
  );
};

export default RootElement;

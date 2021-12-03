import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data }) => {
  const {
    allChangelog: { nodes }
  } = data;

  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      {nodes.map((node, index) => {
        const {
          name,
          // repository: { createdAt },
          text: {
            childMarkdownRemark: { html }
          }
        } = node;
        return (
          <div>
            <div className="text-brand-primary text-5xl font-black">{name}</div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      })}
    </main>
  );
};

export const query = graphql`
  {
    allChangelog(sort: { fields: repository___createdAt, order: DESC }) {
      nodes {
        name
        repository {
          createdAt
        }
        text {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

export default Page;

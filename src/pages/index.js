import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data }) => {
  const {
    allChangelog: { nodes }
  } = data;

  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      {nodes.map((node, index) => {
        const { name, date, html } = node;
        return (
          <div key={index}>
            <div className="text-brand-primary text-5xl font-black">{name}</div>
            <div className="text-2xl font-black">{date}</div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      })}
    </main>
  );
};

export const query = graphql`
  {
    allChangelog(sort: { fields: index, order: DESC }) {
      nodes {
        name
        index
        date(formatString: "dddd DD MMMM YYYY")
        html
      }
    }
  }
`;

export default Page;

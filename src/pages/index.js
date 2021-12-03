import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data }) => {
  const {
    allChangelog: { nodes }
  } = data;

  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      {nodes.map((node, index) => {
        const { name, date, timestamp, markdown } = node;
        return (
          <div>
            <div className="text-brand-primary text-5xl font-black">{name}</div>
            <div className="text-2xl font-black">{date}</div>
            <div className="text-2xl font-black">{timestamp}</div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: markdown }}
            />
          </div>
        );
      })}
    </main>
  );
};

export const query = graphql`
  {
    allChangelog(sort: { fields: name, order: DESC }) {
      nodes {
        name
        date(formatString: "dddd DD MMMM YYYY")
        timestamp
        markdown
      }
    }
  }
`;

export default Page;

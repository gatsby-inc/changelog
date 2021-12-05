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
            <a
              className="text-brand-primary text-5xl font-black"
              href={`#${name}`}
            >
              <span className="text-lg text-gray-300">#</span>
              {name}
            </a>
            <div className="text-md text-gray-500">{date}</div>
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

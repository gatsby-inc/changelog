import React from 'react';

import graphqlWithAuth from '../utils/graphql-with-auth';

const Page = ({ serverData: { pullRequests, watchers, issues } }) => {
  return (
    <article>
      <div className="grid gap-4">
        <h2 className="text-brand-primary text-2xl font-black">
          Pull Requests
        </h2>
        <ul className="grid gap-4">
          {pullRequests.nodes.map((node, index) => {
            const {
              author: { login },
              publishedAt,
              bodyText
            } = node;
            return (
              <li key={index}>
                <h3 className="text-lg font-bold text-gray-800">{login}</h3>
                <h5 className="text-md font-bold text-gray-400">
                  {new Date(publishedAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h5>
                {bodyText ? (
                  <div
                    className="prose max-w-full text-sm"
                    dangerouslySetInnerHTML={{
                      __html: bodyText
                    }}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <pre className="prose">{JSON.stringify(pullRequests, null, 2)}</pre>
      <pre className="prose">{JSON.stringify(watchers, null, 2)}</pre>
      <pre className="prose">{JSON.stringify(issues, null, 2)}</pre> */}
    </article>
  );
};

export async function getServerData() {
  const {
    repository: { pullRequests, watchers, issues }
  } = await graphqlWithAuth(`
  query {
    repository(name: "gatsby", owner: "gatsbyjs") {
      pullRequests(last: 10) {
        nodes {
          author {
            login
          }
          bodyText
          publishedAt
          title
        }
      }
      watchers(last: 10) {
        nodes {
          createdAt
          login
        }
      }
      issues(last: 10) {
        nodes {
          author {
            login
          }
          bodyText
        }
      }
    }
  }
  `);

  return {
    status: 200,
    props: {
      pullRequests,
      watchers,
      issues
    }
  };
}

export default Page;

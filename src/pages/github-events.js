import React from 'react';
import { Octokit } from '@octokit/rest';

import RepoEvents from '../components/repo-events';
import EventCard from '../components/event-card';

const Page = ({ serverData: { gatsby, changelog } }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <RepoEvents
        repoName="Gatsby"
        color="white"
        background="brand-default"
        inner="purple-50"
      >
        {gatsby.map((event, index) => {
          const { type, actor, created_at, repo, payload } = event;
          return (
            <EventCard
              key={index}
              type={type}
              date={created_at}
              login={actor.login}
              repo={repo}
              commits={payload.commits}
            />
          );
        })}
      </RepoEvents>
      <RepoEvents
        repoName="Changelog"
        color="brand-primary"
        background="white"
        inner="purple-50"
      >
        {changelog.map((event, index) => {
          const { type, actor, created_at, repo, payload } = event;
          return (
            <EventCard
              key={index}
              type={type}
              date={created_at}
              login={actor.login}
              repo={repo}
              commits={payload.commits}
            />
          );
        })}
      </RepoEvents>
    </div>
  );
};

export default Page;

export async function getServerData() {
  const octokit = new Octokit({
    auth: process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN,
    userAgent: 'Changelog'
  });

  const { data: gatsby } = await octokit.request(
    'GET /repos/{owner}/{repo}/events',
    {
      owner: 'gatsbyjs',
      repo: 'gatsby',
      per_page: 100
    }
  );

  const { data: changelog } = await octokit.request(
    'GET /repos/{owner}/{repo}/events',
    {
      owner: 'gatsby-inc',
      repo: 'changelog',
      per_page: 100
    }
  );

  return {
    status: 200,
    props: {
      gatsby,
      changelog
    }
  };
}

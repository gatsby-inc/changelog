import React from 'react';
import { Octokit } from '@octokit/rest';

import RepoEvents from '../components/repo-events';
import EventCard from '../components/event-card';
import GatsbyLogo from '../components/gatsby-logo';
import ChangelogLogo from '../components/changelog-logo';

const Page = ({ serverData: { gatsby, changelog } }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <RepoEvents
        color="white"
        background="brand-default"
        inner="purple-50"
        logo={<GatsbyLogo />}
        repo={gatsby.repo}
      >
        {gatsby.events.map((event, index) => {
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
        color="brand-default"
        background="white"
        inner="purple-50"
        logo={<ChangelogLogo />}
        repo={changelog.repo}
      >
        {changelog.events.map((event, index) => {
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
  const GATSBY_JS = 'gatsbyjs';
  const GATSBY = 'gatsby';

  const GATSBY_INC = 'gatsby-inc';
  const CHANGELOG = 'changelog';

  const octokit = new Octokit({
    auth: process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN,
    userAgent: 'Changelog'
  });

  const { data: gatsbyRepo } = await octokit.request(
    `GET /repos/{owner}/{repo}`,
    {
      owner: GATSBY_JS,
      repo: GATSBY
    }
  );

  const { data: gatsbyEvents } = await octokit.request(
    'GET /repos/{owner}/{repo}/events',
    {
      owner: GATSBY_JS,
      repo: GATSBY,
      per_page: 100
    }
  );

  const { data: changelogRepo } = await octokit.request(
    `GET /repos/{owner}/{repo}`,
    {
      owner: GATSBY_INC,
      repo: CHANGELOG
    }
  );

  const { data: changelogEvents } = await octokit.request(
    'GET /repos/{owner}/{repo}/events',
    {
      owner: GATSBY_INC,
      repo: CHANGELOG,
      per_page: 100
    }
  );

  return {
    status: 200,
    props: {
      gatsby: {
        repo: gatsbyRepo,
        events: gatsbyEvents
      },
      changelog: {
        repo: changelogRepo,
        events: changelogEvents
      }
    }
  };
}

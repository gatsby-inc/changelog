import React, { Fragment } from 'react';

import { useQuery } from '@tanstack/react-query';

import Seo from '../components/seo';
import Loading from '../components/loading';
import Error from '../components/error';
import CommitChart from '../components/commit-chart';
import ContributorChart from '../components/contributors-chart';

const Page = () => {
  const gatsby = useQuery(
    ['gatsby'],
    async () => {
      return await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();
    },
    {
      retry: 2
    }
  );

  const changelog = useQuery(
    ['changelog'],
    async () => {
      return await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsby-inc', repository: 'changelog' })
        })
      ).json();
    },
    {
      retry: 2
    }
  );

  const contributers = useQuery(
    ['contributers'],
    async () => {
      return await (
        await fetch('/api/github/contributors', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();
    },
    {
      retry: 2
    }
  );

  return (
    <div className="w-full grid gap-8">
      {contributers.isLoading ? (
        <Loading />
      ) : contributers.isError ? (
        <Error />
      ) : contributers.data ? (
        <ContributorChart data={contributers.data} id="gatsby" href="github.com/gatsbyjs/gatsby" />
      ) : null}

      {gatsby.isLoading ? (
        <Loading />
      ) : gatsby.isError ? (
        <Error />
      ) : gatsby.data ? (
        <CommitChart data={gatsby.data} id="gatsby" href="github.com/gatsbyjs/gatsby" />
      ) : null}

      {changelog.isLoading ? (
        <Loading />
      ) : changelog.isError ? (
        <Error />
      ) : changelog.data ? (
        <CommitChart data={changelog.data} type="bar" id="changelog" href="github.com/gatsby-inc/changelog" />
      ) : null}
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

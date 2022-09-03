import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import CommitChart from '../components/commit-chart';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gatsby, setGatsby] = useState(null);
  const [changelog, setChangelog] = useState(null);

  useEffect(() => {
    const getCommits = async () => {
      const gatsby = await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();

      const changelog = await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsby-inc', repository: 'changelog' })
        })
      ).json();

      setGatsby(gatsby);
      setChangelog(changelog);
      setIsLoading(false);
    };

    getCommits();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full grid gap-8">
          <h1 className="text-3xl font-black text-brand-primary">12 Month Commit Activity</h1>
          <div className="grid gap-16">
            <CommitChart data={gatsby} id="gatsby" href="github.com/gatsbyjs/gatsby" />
            <CommitChart data={changelog} type="bar" id="changelog" href="github.com/gatsby-inc/changelog" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

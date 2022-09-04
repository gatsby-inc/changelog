import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import CommitChart from '../components/commit-chart';
import ContributorChart from '../components/contributors-chart';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gatsby, setGatsby] = useState(null);
  const [changelog, setChangelog] = useState(null);
  const [contributers, setContributors] = useState(null);

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

      const contributers = await (
        await fetch('/api/github/contributors', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();

      setGatsby(gatsby);
      setChangelog(changelog);
      setContributors(contributers);
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
          <h1 className="text-3xl font-black text-brand-primary">{`Top ${contributers.total_contributors} Contributors`}</h1>
          <ContributorChart data={contributers} id="gatsby" href="github.com/gatsbyjs/gatsby" />
          <h2 className="text-3xl font-black text-brand-primary">12 Month Commit Activity</h2>
          <div className="grid gap-16">
            {/* <pre className="font-sans whitespace-pre-wrap">{JSON.stringify(contributers, null, 2)}</pre> */}
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

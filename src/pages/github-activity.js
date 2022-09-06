import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import CommitChart from '../components/commit-chart';
import ContributorChart from '../components/contributors-chart';

const Page = () => {
  const [gatsby, setGatsby] = useState(null);
  const [changelog, setChangelog] = useState(null);
  const [contributers, setContributors] = useState(null);

  useEffect(() => {
    const getCommits = async () => {
      try {
        const gatsby = await (
          await fetch('/api/github/commits', {
            method: 'POST',
            body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
          })
        ).json();

        setGatsby(gatsby);
      } catch (error) {
        console.error('error: gatsby commits');
      }

      try {
        const changelog = await (
          await fetch('/api/github/commits', {
            method: 'POST',
            body: JSON.stringify({ owner: 'gatsby-inc', repository: 'changelog' })
          })
        ).json();

        setChangelog(changelog);
      } catch (error) {
        console.eror('error: changelog commits');
      }

      try {
        const contributers = await (
          await fetch('/api/github/contributors', {
            method: 'POST',
            body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
          })
        ).json();
        setContributors(contributers);
      } catch (error) {
        console.error('error: gatsby contributers');
      }
    };

    getCommits();
  }, []);

  return (
    <div className="w-full grid gap-8">
      {contributers ? (
        <Fragment>
          <h1 className="text-3xl font-black text-brand-primary">{`Top ${contributers.total_contributors} Contributors`}</h1>
          <ContributorChart data={contributers} id="gatsby" href="github.com/gatsbyjs/gatsby" />
        </Fragment>
      ) : (
        <Loading />
      )}
      {gatsby || changelog ? (
        <h2 className="text-3xl font-black text-brand-primary">12 Month Commit Activity</h2>
      ) : null}
      <div className="grid gap-16">
        {gatsby ? <CommitChart data={gatsby} id="gatsby" href="github.com/gatsbyjs/gatsby" /> : <Loading />}
        {changelog ? (
          <CommitChart data={changelog} type="bar" id="changelog" href="github.com/gatsby-inc/changelog" />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

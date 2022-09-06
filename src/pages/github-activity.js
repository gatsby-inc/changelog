import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import CommitChart from '../components/commit-chart';
import ContributorChart from '../components/contributors-chart';

const Page = () => {
  const [gatsby, setGatsby] = useState(null);
  const [gatsbyError, setGatsbyError] = useState(false);
  const [changelog, setChangelog] = useState(null);
  const [changelogError, setChangelogError] = useState(false);
  const [contributers, setContributors] = useState(null);
  const [contributorsError, setContributorsError] = useState(false);

  useEffect(() => {
    const getCommits = async () => {
      const gatsby = await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();
      if (gatsby.status === 200) {
        setGatsby(gatsby);
      } else {
        setGatsbyError(true);
      }

      const changelog = await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsby-inc', repository: 'changelog' })
        })
      ).json();
      if (changelog.status === 200) {
        setChangelog(changelog);
      } else {
        setChangelogError(true);
      }

      const contributers = await (
        await fetch('/api/github/contributors', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();
      if (contributers.status === 200) {
        setContributors(contributers);
      } else {
        setContributorsError(true);
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
        <Fragment>
          {contributorsError ? (
            <div className="border rounded border-red-300 p-2 fontbold text-red-800 bg-red-200">Error</div>
          ) : (
            <Loading />
          )}
        </Fragment>
      )}
      {gatsby || changelog ? (
        <h2 className="text-3xl font-black text-brand-primary">12 Month Commit Activity</h2>
      ) : null}
      <div className="grid gap-16">
        {gatsby ? (
          <CommitChart data={gatsby} id="gatsby" href="github.com/gatsbyjs/gatsby" />
        ) : (
          <Fragment>
            {gatsbyError ? (
              <div className="border rounded border-red-300 p-2 fontbold text-red-800 bg-red-200">Error</div>
            ) : (
              <Loading />
            )}
          </Fragment>
        )}
        {changelog ? (
          <CommitChart data={changelog} type="bar" id="changelog" href="github.com/gatsby-inc/changelog" />
        ) : (
          <Fragment>
            {changelogError ? (
              <div className="border rounded border-red-300 p-2 fontbold text-red-800 bg-red-200">Error</div>
            ) : (
              <Loading />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

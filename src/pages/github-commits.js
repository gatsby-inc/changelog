import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import LineChart from '../components/line-chart';

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
            <div className="grid gap-4">
              <h2 className="text-lg font-bold text-gray-800">Gatsby</h2>
              <LineChart data={gatsby} />
              <small className="text-xs">
                <a
                  href="https://github.com/gatsbyjs/gatsby"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary hover:text-brand-secondary"
                >
                  github.com/gatsbyjs/gatsby
                </a>
              </small>
            </div>
            <div className="grid gap-4">
              <h2 className="text-lg font-bold text-gray-800">Changelog</h2>
              <LineChart data={changelog} />
              <small className="text-xs">
                <a
                  href="https://github.com/gatsby-inc/changelog"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary hover:text-brand-secondary"
                >
                  github.com/gatsby-inc/changelog
                </a>
              </small>
            </div>
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

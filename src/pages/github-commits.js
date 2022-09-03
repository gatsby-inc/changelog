import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';
import Loading from '../components/loading';
import LineChart from '../components/line-chart';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const getCommits = async () => {
      const response = await (
        await fetch('/api/github/commits', {
          method: 'POST',
          body: JSON.stringify({ owner: 'gatsbyjs', repository: 'gatsby' })
        })
      ).json();

      setResponse(response);
      setIsLoading(false);
    };

    getCommits();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <h5 className="mb-3 font-bold text-gray-600">12 Month Commit Activity</h5>
          <LineChart data={response} />
          <small>
            <a
              href="https://github.com/gatsbyjs/gatsby"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-primary hover:text-brand-secondary"
            >
              github.com/gatsbyjs/gatsby
            </a>
          </small>
        </div>
      )}
    </Fragment>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

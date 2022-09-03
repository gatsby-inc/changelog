import React from 'react';
import { Link } from 'gatsby';

import Seo from '../components/seo';

const Page = () => {
  return (
    <main>
      <h1>Not Found Page</h1>
      <Link to="/">Back</Link>
    </main>
  );
};

export default Page;

export const Head = () => {
  return <Seo />;
};

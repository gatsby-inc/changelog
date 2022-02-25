import React from 'react';
import { Link } from 'gatsby';

import useAllChangelog from '../hooks/use-all-changelog';
import useIntro from '../hooks/use-intro';

const Page = () => {
  const changelog = useAllChangelog();
  const intro = useIntro();

  return (
    <article className="grid gap-8">
      <div className="overflow-scroll">
        <div className="grid gap-4">
          <h1 className="text-brand-primary text-5xl font-black">{intro.name}</h1>
          <div className="prose max-w-none break-normal text-sm" dangerouslySetInnerHTML={{ __html: intro.html }} />
        </div>
      </div>
      {changelog.map((node, index) => {
        const {
          name,
          frontmatter: { date, version },
          html
        } = node;

        const hash = `#${version || name}`;
        return (
          <div key={index} className="overflow-scroll">
            <div className="grid gap-8">
              <div>
                <Link id={hash.split('#')[1]} className="text-brand-primary text-5xl font-black" to={hash}>
                  <span className="text-2xl text-gray-300 mr-1">#</span>
                  {version || name}
                </Link>
                <h4 className="text-md font-bold text-gray-400">{date}</h4>
              </div>
              <div className="prose max-w-none break-normal text-sm" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default Page;

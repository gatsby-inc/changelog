import React, { Fragment, useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router';

import { MenuIcon } from '@heroicons/react/solid';

const Page = ({ data }) => {
  const {
    allChangelog: { nodes }
  } = data;

  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Fragment>
      <header className="fixed top-0 bg-white px-8 py-4 border-b border-gray-200 w-screen min-h-header z-header">
        <div className="flex justify-between items-center">
          <div>
            <a
              href="https://twitter.com/GatsbyChangelog"
              rel="noreferrer"
              target="_blank"
            >
              @GatsbyChangelog
            </a>
          </div>
          <div>
            <MenuIcon
              className="block md:hidden h-5 w-5 cursor-pointer"
              onClick={handleNav}
            />
          </div>
        </div>
      </header>
      <main className="mt-main">
        <Location>
          {({ location }) => {
            const { hash } = location;

            return (
              <nav
                className={`absolute top-8 shadow-xl md:fixed md:left-0 h-screen px-4 py-8 text-sm bg-white border-r border-gray-200 z-nav overflow-y-scroll transition-all duration-500 ease-in-out ${
                  navOpen ? 'left-0' : '-left-80'
                } `}
              >
                <ul>
                  {nodes.map((node, index) => {
                    const { name } = node;

                    const isHash = hash === `#${name}`;

                    return (
                      <li key={index} className="mb-1">
                        <Link
                          to={`#${name}`}
                          className={`block p-1 rounded ${
                            isHash
                              ? 'font-bold bg-purple-100'
                              : 'hover:underline hover:text-brand-primary'
                          }`}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          }}
        </Location>
        <section className="md:ml-sidebar">
          <div className="px-4 py-4 md:px-8 md:py-8">
            <article className="grid gap-8">
              {nodes.map((node, index) => {
                const { name, date, html } = node;

                const hash = `#${name}`;
                return (
                  <div key={index} className="overflow-scroll">
                    <Link
                      className="jumplink text-brand-primary text-3xl font-black"
                      to={hash}
                    >
                      <span className="text-lg text-gray-300">#</span>
                      {name}
                    </Link>

                    <div className="text-md text-gray-500">{date}</div>
                    <div
                      className="prose text-sm"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </div>
                );
              })}
            </article>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export const query = graphql`
  {
    allChangelog(sort: { fields: index, order: DESC }) {
      nodes {
        name
        index
        date(formatString: "dddd DD MMMM YYYY")
        html
      }
    }
  }
`;

export default Page;

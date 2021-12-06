import React, { Fragment, useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router';

import { MenuIcon, XIcon } from '@heroicons/react/solid';

import Logo from '../components/logo';
import Twitter from '../components/twitter';

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
          <Link to="/">
            <Logo />
          </Link>

          <div className="block md:hidden">
            {navOpen ? (
              <XIcon className="h-5 w-5 cursor-pointer" onClick={handleNav} />
            ) : (
              <MenuIcon
                className="h-5 w-5 cursor-pointer"
                onClick={handleNav}
              />
            )}
          </div>
        </div>
      </header>
      <main className="mt-main">
        <Location>
          {({ location }) => {
            const { hash } = location;

            return (
              <nav
                className={`fixed top-8 shadow-xl  md:left-0 h-screen min-w-nav px-8 py-16 text-sm bg-white border-r border-gray-200 z-nav overflow-y-scroll transition-all duration-500 ease-in-out ${
                  navOpen ? 'left-0' : '-left-96'
                } `}
              >
                <a
                  className="grid grid-cols-auto-1fr mb-8"
                  href="https://twitter.com/GatsbyChangelog"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Twitter />
                  <span className="text-sm text-gray-400">
                    @GatsbyChangelog
                  </span>
                </a>
                <ul>
                  {nodes.map((node, index) => {
                    const {
                      name,
                      frontmatter: { version }
                    } = node;

                    const isHash = hash === `#${version || name}`;

                    return (
                      <li key={index} className="mb-2">
                        <Link
                          to={`#${version || name}`}
                          className={`block p-1 rounded ${
                            isHash
                              ? 'font-bold bg-purple-100'
                              : 'hover:underline hover:text-brand-primary'
                          }`}
                        >
                          {`${index === 0 ? '*' : ''} Version: ${version}`}
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
          <div
            onClick={handleNav}
            onKeyDown={handleNav}
            role="button"
            aria-label="close navigation"
            tabIndex={0}
            className={`fixed ${
              navOpen ? 'cursor-pointer md:hidden' : 'hidden'
            } w-full h-full bg-black opacity-50 z-lightbox`}
          />
          <div className="px-4 py-4 md:px-12 md:py-8">
            <article className="grid gap-8">
              {nodes.map((node, index) => {
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
                        <Link
                          id={hash.split('#')[1]}
                          className="text-brand-primary text-5xl font-black"
                          to={hash}
                        >
                          <span className="text-2xl text-gray-300 mr-1">#</span>
                          {version || name}
                        </Link>
                        <h4 className="text-md font-bold text-gray-400">
                          {date}
                        </h4>
                      </div>
                      <div
                        className="prose max-w-full text-sm"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
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
    allChangelog(
      sort: { fields: index, order: DESC }
      filter: { frontmatter: { version: { ne: null } } }
    ) {
      nodes {
        name
        index
        frontmatter {
          date(formatString: "MMMM DD YYYY")
          version
          title
        }
        html
      }
    }
  }
`;

export default Page;

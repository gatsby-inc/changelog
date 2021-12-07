import React, { Fragment, useState } from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { MenuAlt3Icon, XIcon, StatusOnlineIcon } from '@heroicons/react/solid';

import useAllChangelog from '../hooks/use-all-changelog';

import Seo from './seo';
import Logo from './logo';
import Twitter from './twitter';
import GitHub from './github';

const RootElement = ({ children }) => {
  const changelog = useAllChangelog();

  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Fragment>
      <Seo />
      <header className="fixed flex items-center top-0 bg-white px-4 md:px-8 py-4 border-b border-gray-200 w-screen min-h-header z-header">
        <div className="flex flex-grow justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>

          <div className="block md:hidden">
            {navOpen ? (
              <XIcon className="h-5 w-5 cursor-pointer" onClick={handleNav} />
            ) : (
              <MenuAlt3Icon
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
                className={`fixed top-8 shadow-xl md:left-0 h-screen min-w-nav px-6 py-16 text-sm bg-white border-r border-gray-200 z-nav overflow-y-scroll transition-all duration-500 ease-in-out ${
                  navOpen ? 'left-0' : '-left-96'
                } `}
              >
                <div className="grid gap-2">
                  <a
                    className="grid gap-2 grid-cols-auto-1fr items-center text-sm text-gray-400 transition-all hover:text-gray-800 hover:bg-purple-100 py-1 px-2 rounded"
                    href="https://twitter.com/GatsbyChangelog"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Twitter />
                    @GatsbyChangelog
                  </a>
                  <a
                    className="grid gap-2 grid-cols-auto-1fr items-center text-sm text-gray-400 transition-all hover:text-gray-800 hover:bg-purple-100 py-1 px-2 rounded"
                    href="https://github.com/gatsbyjs/gatsby"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <GitHub />
                    GatsbyJs
                  </a>
                  <Link
                    activeClassName="bg-purple-100 text-gray-800"
                    className="grid gap-2 grid-cols-auto-1fr items-center text-sm text-gray-400 transition-all hover:text-gray-800 hover:bg-purple-100 py-1 px-2 rounded"
                    to="/github-events"
                  >
                    <StatusOnlineIcon className="h-7 w-7 cursor-pointer text-brand-primary" />
                    GitHub Events
                  </Link>
                </div>
                <hr className="border-gray-200 mt-8 mb-8" />
                <ul>
                  <li>
                    <Link
                      to="/"
                      className={`block px-2 py-1 rounded hover:underline hover:text-brand-primary ${
                        !hash ? 'font-bold bg-purple-100' : ''
                      }`}
                    >
                      Hi{' '}
                      <span role="img" aria-label="Waving Hand">
                        👋
                      </span>
                    </Link>
                  </li>
                  {changelog.map((node, index) => {
                    const {
                      name,
                      frontmatter: { version }
                    } = node;

                    const isHash = hash === `#${version || name}`;

                    return (
                      <li key={index} className="mb-2">
                        <Link
                          onClick={handleNav}
                          to={`/#${version || name}`}
                          className={`block px-2 py-1 rounded ${
                            isHash
                              ? 'font-bold bg-purple-100'
                              : 'hover:underline hover:text-brand-primary'
                          }`}
                        >
                          {`Version: ${version} ${index === 0 ? '*' : ''}`}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          }}
        </Location>
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
        <section className="md:ml-sidebar">
          <div className="px-4 py-4 md:px-20 md:py-8 bg-gray-50">
            {children}
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default RootElement;

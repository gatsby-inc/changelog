import React from 'react';
import { TerminalIcon } from '@heroicons/react/solid';

const RepoEvents = ({ color, background, inner, logo, repo, children }) => {
  const {
    owner: { login },
    name,
    description,
    html_url
  } = repo;

  return (
    <section className={`rounded-lg shadow-lg p-6 bg-${background}`}>
      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-auto-1fr">
          <div>{logo}</div>
          <div className="grid gap-2">
            <div className={`text-xl font-bold text-${color}`}>{`${login}/${name}`}</div>
            <div className={`text-sm text-${color}`}>{description}</div>
            <a href={html_url} target="_blank" rel="noreferrer" className={`text-sm text-${color}`}>
              {html_url}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-auto-1fr">
          <TerminalIcon className={`h-5 w-5 mt-0.5 text-${color}`} />
          <h3 className="mb-4 pl-1">
            <b className={`capitalize text-${color}`}>{`${name} events`}</b>
          </h3>
        </div>
      </div>
      <article className={`bg-${inner} rounded-lg shadow-inner py-0.5`}>
        <div className="p-2 overflow-y-auto overflow-x-hidden h-main">{children}</div>
      </article>
    </section>
  );
};

export default RepoEvents;

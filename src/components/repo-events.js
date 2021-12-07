import React from 'react';
import { TerminalIcon } from '@heroicons/react/solid';

const RepoEvents = ({
  usename,
  repoName,
  color,
  background,
  inner,
  children
}) => {
  return (
    <section className={`rounded-lg shadow-lg p-6 bg-${background}`}>
      <div className="grid grid-cols-auto-1fr">
        <TerminalIcon className={`h-5 w-5 mt-0.5 text-${color}`} />
        <h3 className="mb-4 pl-1">
          <b className={`text-${color}`}>{repoName}</b>
        </h3>
      </div>
      <article className={`bg-${inner} rounded-lg shadow-inner py-0.5`}>
        <div className="p-2 sm:p-6 overflow-y-auto overflow-x-hidden h-main">
          {children}
        </div>
      </article>
    </section>
  );
};

export default RepoEvents;

import React from 'react';
import { ChipIcon, ChatAltIcon } from '@heroicons/react/solid';

const baseUrl = 'https://github.com';

const EventCard = ({ type, login, date, repo, commits }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-2">
      <div className="grid gap-y-2">
        <div>
          <div className="grid gap-x-2 sm:grid-cols-auto-1fr">
            <ChipIcon className="h-5 w-5 text-red-400" />
            <h4 className="text-sm ml-1">
              <span className="font-bold">Event:</span>
              <span className={`ml-1 p-1 rounded-lg text-xs ${type}`}>{type}</span>
            </h4>
          </div>
          <small className="text-gray-500 font-light">
            {`${new Date(date).toLocaleDateString()} @${new Date(date).toLocaleTimeString()}`}
          </small>
        </div>
        <div className="grid sm:grid-cols-auto-1fr items-center gap-1">
          <b>User:</b>
          <p>@{login}</p>
        </div>
        <div className="grid sm:grid-cols-auto-1fr items-center gap-1">
          <b>Repo:</b>
          <a className="text-xs underline break-all" href={`${baseUrl}/${repo.name}`} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </div>
        <div>
          {Array.isArray(commits) ? (
            <>
              <div className="grid gap-x-2 grid-cols-auto-1fr">
                <ChatAltIcon className="h-5 w-5 text-red-400" />
                <p>
                  <b>Commits</b>
                </p>
              </div>
              <ul className="list-disc list-inside pl-3">
                {commits.map((commit, index) => (
                  <li key={index}>
                    <small className="text-gray-500 font-light">
                      <a
                        href={`${baseUrl}/${repo.name}/commit/${commit.sha}`}
                        target="_blank"
                        rel="noreferrer"
                      >{`message: ${commit.message}`}</a>
                    </small>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

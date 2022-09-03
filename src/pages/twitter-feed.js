import React, { Fragment, useEffect, useState } from 'react';

import Seo from '../components/seo';

import Loading from '../components/loading';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTwitter = async () => {
      const tweet_response = await fetch('/api/get-tweets', {
        method: 'POST',
        // https://codeofaninja.com/tools/find-twitter-id/;
        body: JSON.stringify({ id: '1456240477783695360' })
      });

      const tweet_data = await tweet_response.json();

      const user_response = await fetch('/api/get-twitter-user', {
        method: 'POST',
        body: JSON.stringify({ username: 'GatsbyChangelog' })
      });

      const user_data = await user_response.json();

      setTweets(tweet_data.tweets);
      setUser(user_data.user);

      setIsLoading(false);
    };

    getTwitter();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-16">
          <div className="grid gap-2 shadow-lg p-8 bg-white rounded-lg ">
            <div className="grid gap-2 text-color-800">
              <div className="grid grid-cols-1fr-auto">
                <img className="rounded-full overflow-hidden" src={user.profile_image_url} alt={user.username} />
                <div className="flex items-center">
                  <a
                    className="bg-brand-default hover:bg-brand-primary transition-all px-4 py-2 text-white text-sm rounded-full font-bold"
                    href={`https://twitter.com/${user.username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Follow
                  </a>
                </div>
              </div>
              <div className="grid gap-2">
                <div>
                  <h2 className="text-lg font-bold">{user.username}</h2>
                  <h3 className="text-xs font-bold text-gray-600">{`@${user.username}`}</h3>
                </div>
                <div>
                  <p className="text-md">{user.description}</p>
                  <a
                    className="text-sm text-brand-primary"
                    href={user.entities.url.urls[0].expanded_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.entities.url.urls[0].expanded_url}
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-auto-1fr gap-2">
              <h4 className="text-sm font-bold">{`${user.public_metrics.followers_count} Followers`}</h4>
              <h4 className="text-sm font-bold">{`${user.public_metrics.following_count} Following`}</h4>
            </div>
          </div>
          <div className="sm:mx-8">
            <h5 className="mb-3 font-bold text-gray-600">Latest Tweets</h5>
            <ul className="grid gap-8">
              {tweets.map((tweet, index) => {
                const { text, created_at } = tweet;
                return (
                  <li key={index} className="grid gap-4 shadow p-8 bg-white/80 rounded-lg">
                    <small className="font-bold text-brand-primary">{new Date(created_at).toLocaleDateString()}</small>
                    <p className="font-sans whitespace-pre-wrap">{text}</p>
                  </li>
                );
              })}
            </ul>
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

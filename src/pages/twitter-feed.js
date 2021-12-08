import React, { useEffect, useState } from 'react';

import Loading from '../components/loading';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch('/api/get-tweets', {
        method: 'POST',
        // https://codeofaninja.com/tools/find-twitter-id/;
        body: JSON.stringify({ id: '1456240477783695360' })
      });

      const data = await response.json();

      setTweets(data.tweets);
      setIsLoading(false);
    };

    getTweets();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex place-content-center">
          <Loading />
        </div>
      ) : (
        <ul>
          {tweets.map((tweet, index) => {
            const { text } = tweet;
            return (
              <li key={index} className="shadow p-8 bg-white rounded-lg">
                <pre className="font-sans whitespace-pre-wrap">{text}</pre>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Page;

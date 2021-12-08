const Twitter = require('twitter-v2');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

export default async function hander(req, res) {
  const { id } = JSON.parse(req.body);

  try {
    if (!id) {
      res.status(400).json({ message: 'id not found' });
    }

    const { data } = await twitter.get(`users/${id}/tweets`);

    res.status(200).json({
      message: 'A ok!',
      tweets: data
    });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}

const { twitter } = require('../twitter-client');

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

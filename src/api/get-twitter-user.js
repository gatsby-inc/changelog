const { twitter } = require('../clients/twitter-client');

export default async function hander(req, res) {
  const { username } = JSON.parse(req.body);

  try {
    if (!username) {
      res.status(400).json({ message: 'username not found' });
    }

    const { data } = await twitter.get(`users/by/username/${username}`, {
      user: {
        fields: 'created_at,description,entities,id,name,profile_image_url,protected,public_metrics,url,username'
      }
    });

    res.status(200).json({
      message: 'A ok!',
      user: data
    });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}

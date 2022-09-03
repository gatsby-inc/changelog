const { octokit } = require('../../clients/github-client');

export default async function (req, res) {
  const { owner, repository } = JSON.parse(req.body);

  try {
    //https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
      owner: owner,
      repo: repository
    });

    res.status(200).json({
      message: 'A ok!',
      contributors: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
}

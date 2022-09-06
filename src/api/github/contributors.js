const { octokit } = require('../../clients/github-client');

// Limits the max total
const CAP = 500;

// Limts the contributors
const CONTRIBUTOR_LIMIT = 50;

const modifyContributors = (data) => {
  return data
    .map((item) => {
      const {
        author: { login, html_url, avatar_url, type },
        total
      } = item;
      return {
        login,
        html_url,
        avatar_url,
        type,
        capped_total: total > CAP ? CAP : total,
        total
      };
    })
    .filter((item) => item.type !== 'Bot')
    .filter((item) => item.login !== 'gatsbybot')
    .sort((a, b) => b.total - a.total)
    .slice(0, CONTRIBUTOR_LIMIT);
};

export default async function (req, res) {
  const { owner, repository } = JSON.parse(req.body);

  try {
    // https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
      owner: owner,
      repo: repository
    });

    if (data) {
      const modified_contributors = modifyContributors(data);

      res.status(200).json({
        message: 'Ok',
        status: 200,
        contributor_max: modified_contributors[0].capped_total,
        total_contributors: modified_contributors.length,
        contributors: modified_contributors
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', status: 500, error: error });
  }
}

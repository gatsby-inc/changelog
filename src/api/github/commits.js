const { octokit } = require('../../clients/github-client');
const { formatDateString } = require('../../utils/format-date-string');

const dayCommitMax = (data) => Math.max(...[].concat(...data.map((item) => item.days)));

const modifyCommits = (data) => {
  return data.map((item) => {
    const { total, week, days } = item;

    return {
      total,
      week,
      week_string: new Date(week * 1000),
      date_string: formatDateString(new Date(week * 1000)),
      days
    };
  });
};

export default async function handler(req, res) {
  const { owner, repository } = JSON.parse(req.body);

  try {
    // https://docs.github.com/en/rest/metrics/statistics#get-the-last-year-of-commit-activity
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
      owner: owner,
      repo: repository
    });

    if (data) {
      res.status(200).json({
        message: 'Ok',
        status: 200,
        day_commit_max: dayCommitMax(data),
        week_length: 7,
        total_weeks: data.length,
        commits: modifyCommits(data)
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', status: 500, error: error });
  }
}

const { octokit } = require('../../clients/github-client');

const dayCommitMax = (data) => Math.max(...[].concat(...data.map((item) => item.days)));

export const formatDateString = (dateString) =>
  new Date(dateString).toLocaleString('default', { month: '2-digit', year: '2-digit' });

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

    res.status(200).json({
      message: 'A ok!',
      day_commit_max: dayCommitMax(data),
      week_length: 7,
      total_weeks: data.length,
      commits: modifyCommits(data)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
}

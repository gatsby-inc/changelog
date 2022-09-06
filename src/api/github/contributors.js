const { octokit } = require('../../clients/github-client');
const { formatDateValue } = require('../../utils/format-date-value');

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

const testContributors = (data) => {
  return data.slice(0, 10).map((item) => {
    const {
      author: { login, html_url, avatar_url, type },
      total,
      weeks
    } = item;

    return {
      login,
      html_url,
      avatar_url,
      type,
      // capped_total: total > CAP ? CAP : total,
      total,
      latest_week: weeks
        .filter((week) => week.a > 0)
        .filter((week) => new Date(week.w * 1000).getFullYear() === 2022)
        .map((week) => {
          return {
            test: new Date(week.w * 1000).getFullYear(),
            w: formatDateValue(new Date(week.w * 1000)),
            a: week.a
          };
        })
      // .pop()
      // latest_week: weeks.map((week) => {
      //   return {
      //     weeks: {
      //       w: formatDateValue(new Date(week.w * 1000)),
      //       a: week.a
      //     }
      //   };
      // })
    };
  });
  // .filter((item) => {
  //   console.log(JSON.stringify(item.weeks, null, 2));
  //   // const value = item.latest_week.weeks.filter((w) => w.a > 0);
  //   // console.log(value);

  //   return item;
  // });
};

export default async function (req, res) {
  const { owner, repository } = JSON.parse(req.body);

  try {
    // https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
      owner: owner,
      repo: repository
    });

    const modified_contributors = modifyContributors(data);
    const test_contributors = testContributors(data);

    res.status(200).json({
      message: 'A ok!',
      contributor_max: modified_contributors[0].capped_total,
      total_contributors: modified_contributors.length,
      // contributors: modified_contributors
      contributors: test_contributors
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
}

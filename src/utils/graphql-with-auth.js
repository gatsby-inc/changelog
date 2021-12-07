const { graphql } = require('@octokit/graphql');

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN}`
  }
});

module.exports = graphqlWithAuth;

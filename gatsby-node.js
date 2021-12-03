const { graphql } = require('@octokit/graphql');
const remark_html = require('remark-html');
const remark = require('remark');

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN}`
  }
});

const CHANGELOG = 'changelog';

const convertToMarkdown = async (string) => {
  const response = await remark().use(remark_html).process(string);

  return String(response);
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  const {
    repository: {
      folder: { entries }
    }
  } = await graphqlWithAuth(`
  query {
    repository(name: "gatsby", owner: "gatsbyjs") {
      folder: object(expression: "master:docs/docs/reference/release-notes/") {
        ... on Tree {
          entries {
            name
            repository {
              createdAt
            }
            object {
              ... on Tree {
                entries {
                  name
                  object {
                    ... on Blob {
                      id
                      text
                    }
                  }
                }
              }
            }
            object {
              ... on Blob {
                id
                text
              }
            }
          }
        }
      }
    }
  }
  `);

  const createMarkdownNode = async (data, name, repository) => {
    const { object } = data;
    createNode({
      id: object.id,
      name: name,
      date: repository.createdAt,
      timestamp: new Date(repository.createdAt),
      markdown: await convertToMarkdown(object.text),
      internal: {
        mediaType: 'text/markdown',
        type: CHANGELOG,
        contentDigest: createContentDigest(data)
      }
    });
  };

  entries.forEach((item, index) => {
    const { object, name, repository } = item;
    if (Array.isArray(object.entries)) {
      const markdown = object.entries.find((item) => item.name === 'index.md');
      createMarkdownNode(markdown, name, repository);
    } else {
      createMarkdownNode(item, name, repository);
    }
  });
};

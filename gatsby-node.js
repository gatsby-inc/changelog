const { graphql } = require('@octokit/graphql');

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN}`
  }
});

const CHANGELOG = 'changelog';

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type changelog implements Node {
      text: markdown @link(from: "fields.text")
    }
  `);
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

  const createMarkdownNode = async (data) => {
    const { object } = data;
    createNode({
      ...data,
      id: object.id,
      internal: {
        type: CHANGELOG,
        contentDigest: createContentDigest(data)
      }
    });
  };

  entries.forEach((item, index) => {
    const { object } = item;

    if (Array.isArray(object.entries)) {
      const markdown = object.entries.find((item) => item.name === 'index.md');
      createMarkdownNode(markdown);
    } else {
      createMarkdownNode(item);
    }
  });
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  createContentDigest
}) => {
  if (node.internal.type === CHANGELOG) {
    const markdownNode = {
      id: createNodeId(node.id),
      parent: node.id,
      internal: {
        mediaType: 'text/markdown',
        type: 'markdown',
        content: node.object.text,
        contentDigest: createContentDigest(node)
      }
    };

    createNode(markdownNode);

    if (markdownNode) {
      createNodeField({ node, name: 'text', value: markdownNode.id });
    }
  }
};

const fs = require('fs');
const { graphql } = require('@octokit/graphql');
const remark = require('remark');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');
const rehypeAutoLinkHeadings = require('rehype-autolink-headings');
const rehypeSlug = require('rehype-slug');
const matter = require('gray-matter');

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.OCTOKIT_PERSONAL_ACCESS_TOKEN}`
  }
});

const convertToHTML = async (markdown) => {
  const grayMatter = matter(markdown);

  const response = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutoLinkHeadings)
    .use(rehypeStringify)
    .process(grayMatter.content);

  return String(response);
};

const transformFrontmatter = (markdown) => {
  const grayMatter = matter(markdown);

  return grayMatter.data;
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  const md = fs.readFileSync('./src/content/intro.md', 'utf8');

  createNode({
    id: '123',
    name: await transformFrontmatter(md).title,
    html: await convertToHTML(md),
    internal: {
      type: 'intro',
      contentDigest: createContentDigest(md)
    }
  });

  const {
    repository: {
      folder: { entries }
    }
  } = await graphqlWithAuth(`
  query {
    repository(name: "gatsby", owner: "gatsbyjs") {
      folder: object(expression: "master:docs/docs/reference/release-notes") {
        ... on Tree {
          entries {
            name
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

  const createMarkdownNode = async (data, name, repository, index) => {
    const { object } = data;
    createNode({
      id: object.id,
      index: index,
      name: name,
      frontmatter: await transformFrontmatter(object.text),
      html: await convertToHTML(object.text),
      internal: {
        type: 'changelog',
        contentDigest: createContentDigest(data)
      }
    });
  };

  entries.forEach((item, index) => {
    const { object, name, repository } = item;
    if (Array.isArray(object.entries)) {
      const markdown = object.entries.find((item) => item.name === 'index.md');
      createMarkdownNode(markdown, name, repository, index);
    } else {
      createMarkdownNode(item, name, repository, index);
    }
  });
};

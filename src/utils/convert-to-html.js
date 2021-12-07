const remark = require('remark');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');
const rehypeAutoLinkHeadings = require('rehype-autolink-headings');
const rehypeSlug = require('rehype-slug');
const matter = require('gray-matter');

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

module.exports = convertToHTML;

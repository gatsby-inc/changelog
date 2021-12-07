const matter = require('gray-matter');

const transformFrontmatter = (markdown) => {
  const grayMatter = matter(markdown);

  return grayMatter.data;
};

module.exports = transformFrontmatter;

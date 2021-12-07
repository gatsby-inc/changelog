import { graphql, useStaticQuery } from 'gatsby';

const useAllChangelog = () => {
  const {
    allChangelog: { nodes }
  } = useStaticQuery(graphql`
    query {
      allChangelog(
        sort: { fields: index, order: DESC }
        filter: { frontmatter: { version: { ne: null } } }
      ) {
        nodes {
          name
          index
          frontmatter {
            date(formatString: "MMMM DD YYYY")
            version
            title
          }
          html
        }
      }
    }
  `);

  return nodes;
};

export default useAllChangelog;

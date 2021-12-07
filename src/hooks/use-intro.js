import { graphql, useStaticQuery } from 'gatsby';

const useIntro = () => {
  const { intro } = useStaticQuery(graphql`
    query {
      intro {
        name
        html
      }
    }
  `);

  return intro;
};

export default useIntro;

import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const hash = document.querySelectorAll(`a[href="${location.hash}"]`)[0];
  if (hash) {
    window.scrollTo({
      top: hash.offsetTop
    });
  }
  return true;
};

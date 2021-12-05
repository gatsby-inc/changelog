import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const jumplink = document.querySelectorAll(
    `a.jumplink[href="/${location.hash}"]`
  )[0];

  const nav = document.querySelector(`header`).offsetHeight;

  if (jumplink) {
    window.scrollTo({
      top: jumplink.offsetTop - nav - 32
    });
  }
  return true;
};

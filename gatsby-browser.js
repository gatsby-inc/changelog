import React from 'react';

import RootElement from './src/components/root-element';

import './src/styles/global.css';

export const onRouteUpdate = ({ location }) => {
  const heading = document.getElementById(location.hash.split('#')[1]);
  const nav = document.querySelector(`header`);

  if (heading) {
    window.scrollTo({
      top: heading.offsetTop - nav.offsetHeight - 28
    });
  }
  return true;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};

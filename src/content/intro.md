---
date: ''
version: ''
title: 'Hi 👋'
---

Welcome to the **Gatsby Changelog**, this is a prototype project created for the [GitHub Actions Hackathon 21](https://dev.to/t/actionshackathon21) by [@PaulieScanlon](https://twitter.com/PaulieScanlon)

## How it works

The site reads `.md` files located in the Gatsby GitHub repository. Each Gatsby release is documented in a `.md` file found here: [gatsby/docs/docs/reference/release-notes/](https://github.com/gatsbyjs/gatsby/tree/master/docs/docs/reference/release-notes). Each `.md` file is sourced at build time and statically rendered into this page.

## GitHub Action

A GitHub [Schedule](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#schedule) Action has been used to call a Gatsby Cloud **build** webhook which re-fetches the data every 12 hours.The GitHub Action can be found here: [changelog/.github/workflows/build-me.yml](https://github.com/gatsby-inc/changelog/blob/main/.github/workflows/build-me.yml)

## Dev.to

I've been documenting my journey which you can read on Dev.to here: [Building The Gatsby Changelog Prototype](https://dev.to/pauliescanlon/building-the-gatsby-changelog-prototype-30bn)

## Tech

The `src` code for this project can be found here: [gatsby-inc/changelog](https://github.com/gatsby-inc/changelog)

The project has been created using the following:

- [GatsbyJs](https://www.gatsbyjs.com/)
- [@octokit/graphql](https://github.com/octokit/graphql.js)
- [@octokit/rest](https://github.com/octokit/rest.js)
- [TailwindCSS](https://tailwindcss.com/)
- ...and various [remark](https://github.com/remarkjs/remark/tree/main) plugins
- [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/)

---

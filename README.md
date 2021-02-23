# [@nickFalcone/hover-fetch](https://www.npmjs.com/package/@nfalcone/hover-fetch)
[![NPM info](https://img.shields.io/npm/v/@nfalcone/hover-fetch)](https://app.netlify.com/sites/modest-gates-9e0182/deploys)

[![Netlify Status](https://api.netlify.com/api/v1/badges/966dddec-54e0-404c-9944-46fe2d4f90af/deploy-status)](https://app.netlify.com/sites/modest-gates-9e0182/deploys)

__A programmatic, cross-browser, zero-dependency way to prefetch links.__

> Link prefetching is a browser mechanism, which utilizes browser idle time to download or prefetch documents that the user might visit in the near future...
> When the user visits one of the prefetched documents, it can be served up quickly out of the browser's cache.
&mdash; [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)

## Supported browsers
![link rel prefetch support](https://caniuse.bitsofco.de/image/link-rel-prefetch.jpg)

## Install

```bash
$ npm install @nfalcone/hover-fetch
```
## Use

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
    <script async defer src="app.js" type="module"></script>
  </head>
  <body>
    <h1>hover-fetch</h1>
    <ul>
      <li><a class="link-to-prefetch" href="https://example.com/">Test 1</a></li>
      <li><a href="http://browserify.org/">Test 2</a></li>
      <li><a href="https://pi-hole.net/">Test 3</a></li>
    </ul>
  </body>
</html>
```

```js
// app.js
const hoverFetch = require('@nfalcone/hover-fetch');

const anchor = document.querySelector('.link-to-prefetch');
hoverFetch(anchor); // will initiate a prefetch request when `anchor` is hovered
```

See a working demo at https://hoverfetch.com/

## Develop

### Setup

```bash
$ git clone git@github.com:nickFalcone/hover-fetch.git

$ npm install --save-dev
```

### Local build/watch

```bash
$ npm run dev # serves ./stub on port 8081
```

`stub/app.js` consumes `index.js` directly. 

`stub/index.html` embeds `stub/bundle.js` (the browserify bundled file)
### Test

```bash
$ npm run test # serves ./stub on port 8080 and runs Jest
```
# [@nickFalcone/hover-fetch](https://www.npmjs.com/package/@nfalcone/hover-fetch)
<a href="https://www.npmjs.com/package/@nfalcone/hover-fetch">![npm](https://img.shields.io/npm/v/@nfalcone/hover-fetch)</a>

## Motivation

__A programmatic way to prefetch links.__

> Link prefetching is a browser mechanism, which utilizes browser idle time to download or prefetch documents that the user might visit in the near future...
> When the user visits one of the prefetched documents, it can be served up quickly out of the browser's cache.
--- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
## Install

```bash
$ npm install @nfalcone/hover-fetch
```
## Use

```html
<!-- index.html -->
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

See [a working example](http://hover-fetch.surge.sh/) based on [nickFalcone/test-hover-fetch](https://github.com/nickFalcone/test-hover-fetch).

<!-- TODO: ## Test

```bash
$ npm run test
``` -->

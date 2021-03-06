const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const timeout = 30000;

beforeAll(async () => {
  await page.goto('http://localhost:8080/', {
    waitUntil: 'networkidle2',
  });
});

describe('Initial prefetch state', () => {
  test(
    'There should be no <link rel="prefetch"> on first load.',
    async () => {
      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            0,
          );
        });
    },
    timeout,
  );
});

// FIXME: these tests are order dependent.
// The state of existing link prefetch should be maintained separately.
describe('Hover behavior', () => {
  test(
    'home produces no prefetch',
    async () => {
      await page.waitForSelector('.home');
      await page.hover('.home');

      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            0,
          );
        });
    },
    timeout,
  );

  // TODO: test malformed link e.g. <a href="a98f\sdfg\.7d9af">bad href</a>

  test(
    'Hovering over one valid anchor should create one <link rel="prefetch"> with a matching href value.',
    async () => {
      await page.waitForSelector('.stack-overflow');
      await page.hover('.stack-overflow');

      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            1,
          );
          const link = headNode.querySelectorAll('link[rel="prefetch"]')[0];
          expect(link.rel).toBe('prefetch');
          expect(link.href).toBe('https://stackoverflow.com/');
        });
    },
    timeout,
  );

  test(
    'Subsequent hovers should not create additional <link rel="prefetch">',
    async () => {
      await page.waitForSelector('.stack-overflow');
      await page.hover('.stack-overflow');

      await page.waitForSelector('.browserify');
      await page.hover('.browserify');

      await page.waitForSelector('.pi-hole');
      await page.hover('.pi-hole');

      await page.waitForSelector('.home');
      await page.hover('.home');

      // hover each link again
      await page.hover('.stack-overflow');
      await page.hover('.browserify');
      await page.hover('.pi-hole');
      await page.hover('.home');

      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            3,
          );

          // SSL .com - most likely scenario
          const link1 = headNode.querySelectorAll('link[rel="prefetch"]')[0];
          expect(link1.rel).toBe('prefetch');
          expect(link1.href).toBe('https://stackoverflow.com/');

          // http .org - less common
          const link2 = headNode.querySelectorAll('link[rel="prefetch"]')[1];
          expect(link2.rel).toBe('prefetch');
          expect(link2.href).toBe('http://browserify.org/');

          // SSL .net ¯\_(ツ)_/¯
          const link3 = headNode.querySelectorAll('link[rel="prefetch"]')[2];
          expect(link3.rel).toBe('prefetch');
          expect(link3.href).toBe('https://pi-hole.net/');
        });
    },
    timeout,
  );

  test(
    'Hovering over one valid anchor with URL parameters should create one <link rel="prefetch"> with a matching href value.',
    async () => {
      await page.waitForSelector('.query-string');
      await page.hover('.query-string');

      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            4,
          );
          const link = headNode.querySelectorAll('link[rel="prefetch"]')[3];
          expect(link.rel).toBe('prefetch');
          expect(link.href).toBe('https://example.com/?abc=123&doremi=abc');
        });
    },
    timeout,
  );

  test(
    'Hovering over the base URL parameters should not create an additional prefetch.',
    async () => {
      await page.waitForSelector('.query-string-base');
      await page.hover('.query-string-base');

      await page
        .$eval('head', (head) => head.innerHTML)
        .then((result) => {
          const headNode = JSDOM.fragment(result);
          expect(headNode.querySelectorAll('link[rel="prefetch"]').length).toBe(
            4,
          );
        });
    },
    timeout,
  );
});

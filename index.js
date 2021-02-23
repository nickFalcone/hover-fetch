module.exports = function hoverFetch(anchor) {
  if (!document.head) return;

  /**
   * Adds <link rel=prefetch> when a link is hovered over
   * https://web.dev/link-prefetch/#improve-navigations-with-relprefetch
   * https://caniuse.com/link-rel-prefetch
   * Inspired by:
   * https://github.com/google/eleventy-high-performance-blog/blob/870557848f0032347b251440cdf6096821af557d/src/main.js#L66
   * @param {MouseEvent} - mouseEvent
   * @return {undefined}
   */
  function prefetch(mouseEvent) {
    if (mouseEvent.target.tagName !== 'A') return;

    const stripUrlFragment = (url) => url.split('#')[0];
    // do not prefetch links to the current page
    if (
      stripUrlFragment(window.location.href) ===
      stripUrlFragment(mouseEvent.target.href)
    )
      return;

    if (prefetchedLinks.includes(mouseEvent.target.href)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = mouseEvent.target.href;
    link.as = 'document';

    document.head.appendChild(link);
    prefetchedLinks.push(link.href);
  }

  const prefetchedLinks = [];

  anchor.addEventListener('mouseover', prefetch, {
    capture: true,
    passive: true,
  });
};

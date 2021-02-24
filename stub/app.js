import hoverFetch from '../index';

// Links at build time
const anchors = Array.prototype.slice.call(document.querySelectorAll('a'));

// Initiate a prefetch request on hover
anchors.forEach((anchor) => {
  hoverFetch(anchor);
});

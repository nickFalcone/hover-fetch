(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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

    var stripUrlFragment = function stripUrlFragment(url) {
      return url.split('#')[0];
    }; // do not prefetch links to the current page


    if (stripUrlFragment(window.location.href) === stripUrlFragment(mouseEvent.target.href)) return;
    if (prefetchedLinks.indexOf(mouseEvent.target.href) >= 0) return;
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = mouseEvent.target.href;
    link.as = 'document';
    document.head.appendChild(link);
    prefetchedLinks.push(link.href);
  }

  var prefetchedLinks = [];
  anchor.addEventListener('mouseover', prefetch, {
    capture: true,
    passive: true
  });
};

},{}],2:[function(require,module,exports){
"use strict";

var hoverFetch = require('../index');

var addLink = document.querySelector('#addLinks');
var linkList = document.querySelector('.list-of-links'); // Dynamically added links

addLink.addEventListener('click', function () {
  var listItem = document.createElement('li');
  var textNode = document.createTextNode('a dynamically added link');
  var anchor = document.createElement('a');
  listItem.appendChild(textNode);
  anchor.appendChild(listItem);
  anchor.href = 'https://www.example.com/';
  linkList.appendChild(anchor);
}); // Links at build time

var anchors = Array.prototype.slice.call(document.querySelectorAll('a')); // Initiate a prefetch request on hover

anchors.forEach(function (anchor) {
  hoverFetch(anchor);
});

},{"../index":1}]},{},[2]);
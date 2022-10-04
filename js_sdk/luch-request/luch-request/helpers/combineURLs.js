'use strict'

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
export default function combineURLs(baseURL, relativeURL) {

  console.log('combineURLs--'+baseURL+"==="+relativeURL)
  if(baseURL.indexOf(/\/+$/) !== -1){
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
  }
  return relativeURL
    ? baseURL + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}

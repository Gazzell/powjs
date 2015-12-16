/**
 * Created by joseba on 11/12/15.
 */
"use strict";

/**
 * Extracts base path from an URL
 * @param {string} url. URL to parse
 * @returns {string}. Base URL
 */
export function extractUrlBase(url) {
    let parts = url.split('/');
    parts.pop();
    return parts.length < 1 ? '' : parts.join('/') + '/';
}

/**
 * Extracts fileName from an URL
 * @param {string} url. Complete URL
 * @returns {string} [fileName]. File name
 */
export var extractFileName = (url) => url.split('/').pop();

/**
 * Very basic func to extract a file extension from its name
 * @param {string} url. File URL, assuming the file has only a '.' separating file extension
 * @returns {string} file extension
 */
export var extractExt = (url) => url.split('.').pop();

/**
 * Normalize URL, removing '//' and other chars
 * @param {string} url. URL to normalize
 * @returns {string} Normalized URL
 */
export function normalizeUrl(url) {
    let newUrl = url,
        len,
        tag;

    let httpHead = "";
    if (newUrl.substr(0, 7) == 'http://') {
        httpHead = 'http://';
        newUrl = newUrl.substring(7, newUrl.length);
    }
    // remove extra slashes
    let tags = newUrl.split('/');
    newUrl = '';

    len = tags.length;
    while (len > 0) {
        tag = tags.pop();
        if (tag != '') {
            if (newUrl == '') {
                newUrl = tag;
            } else {
                newUrl = tag + '/' + newUrl;
            }
        }
        len--;
        if (len == 0 && url[0] == '/') {
            newUrl = '/' + newUrl;
        }
    }

    return httpHead + newUrl;
}

/**
 * Generates a random UID
 * @returns {number} generated UID
 */
export function generateGUID() {
    let newGuid;

    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    newGuid = (S4() + S4() + S4() + S4());

    return newGuid;
}

/**
 * Normalize URL, removing '//' and other chars
 * @param {number} num. Number to find the nearest power of two
 * @returns {number} power of two
 */
export function computePowerOfTwo(num)
{
    // brute force solution
    let poweroftwo = 2;

    // while power of two is smaller
    while(poweroftwo < num) {
        // compute next one
        poweroftwo *= 2;
    }

    return poweroftwo;
}
/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export default function LoadTextFile(url) {
  return new Promise((resolve, reject) => {
    const r = new XMLHttpRequest();

    r.addEventListener('load', () => {
      if (r.status == 200) {
        resolve(r.responseText);
      }
      else {
        reject('http error ' + r.status);
      }
    });

    r.addEventListener('error', () => { reject('error'); })
    r.addEventListener('abort', () => { reject('abort'); })

    r.open('GET', url);
    r.send();
  });
}

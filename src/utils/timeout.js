import Promise from 'bluebird';

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */

export default function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

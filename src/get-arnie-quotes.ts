import { httpGet } from './mock-http-interface';

type KeyType = 'Arnie Quote' | 'FAILURE';
type TResult = {
  [key in KeyType]?: string;
};

/**
 * ? The goal is to write an implementation of getArnieQuotes() that meets all requirements and passes all unit tests.
 * * If the HTTP status code of the response is 200, push an object to the results array
 * * with a single key "Arnie Quote" and the HTTP response body's message property as the key's associated value.
 *
 *  * If the HTTP status code of the response is not 200,
 *  * push an object to the results array with a single key "FAILURE"
 *  * and the HTTP response body's message property as the key's associated value.
 *
 *  * Finally, the getArnieQuotes() function's return value must be a promise that resolves to the overall results array.
 *
 * @param urls
 * @returns {Promise<TResult>}
 */

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const results = await Promise.all(urls.map((url) => httpGet(url)));
  return results.map(({ status, body }) => {
    if (status === 200) {
      return {
        'Arnie Quote': JSON.parse(body)?.message,
      };
    }
    return {
      FAILURE: JSON.parse(body)?.message,
    };
  });
};

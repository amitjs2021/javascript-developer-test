const { httpGet } = require("./mock-http-interface");

/**
 *
 * Resolving collection promises for promise-all action
 * @param {*} urls[]
 * @returns Promise collection for Promise.all([]) from httpGet<> method
 */

const getHTTPresponse = async (urls) => {
  return await urls.map(async (url) => await httpGet(url));
};

/**
 *
 * @param {*} urls[]
 * @returns Promise resolved Array of "Arnie Quotes" with key value
 */

const getPromiseResonse = async (urls) => {
  const responseArray = [];
  const promiseRes = await getHTTPresponse(urls);

  const response = await Promise.all(promiseRes);
  response.forEach((res) => {
    let message = JSON.parse(res.body).message;

    if (res.status === 200) {
      responseArray.push({ "Arnie Quote": message });
    }
    if (res.status === 500) {
      responseArray.push({ FAILURE: message });
    }
  });
  return responseArray;
};

/**
 * getArnieQuotes will only pass URLS and return Resolved promise
 * Idea is single function is responsible for single task - like SOLID principle
 * Implementing S from SOLID here
 */

const getArnieQuotes = async (urls) => {
  return await getPromiseResonse(urls);
};

/*
code is commented for local testing - not removing just to share base approach
const urls = [
  "http://www.smokeballdev.com/arnie0",
  "http://www.smokeballdev.com/arnie1",
  "http://www.smokeballdev.com/arnie2",
  "http://www.smokeballdev.com/arnie3",
];

urls.forEach((url) => {
  getArnieQuotes(urls);
});
*/

module.exports = {
  getArnieQuotes,
};

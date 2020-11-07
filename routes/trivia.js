/**
 * routes for trivia API
 *
 * makes calls to external API Open Trivia
 * https://opentdb.com/api_config.php
 *
 */


const axios = require('axios');
const express = require('express');
const ExpressError = require('../helpers/ExpressError');

const router = new express.Router();

const BASE_URL = "https://opentdb.com/"

/**
 *
 * gives error messages related to the single digit response codes from API
 */
function readResponseCode(int) {
  const codes = {
    0: [`Success! Returned results successfully. ${int}`, 200],
    1: [`No Results! Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.) ${int}`, 400],
    2: [`Invalid Parameter! Contains an invalid parameter. Arguments passed in aren't valid. (Ex. Amount = Five) ${int}`, 400],
    3: [`Token Not Found! Session Token does not exist. ${int}`, 400],
    4: [`Token Empty Session! Token has returned all possible questions for the specified query. Resetting the Token is necessary. ${int}`, 418],  // shouldn't happen.
  }
  const err = codes[int]
  if (int !== 0) throw new ExpressError(...err)
}

function buildQueryStr(obj){
  let qString = ""
  for (let key in obj) qString += `${key}=${obj[key]}&`
  const nQString = qString[qString.length - 1] === "&" ?  qString.slice(0, -1) : qString
  return nQString
}

/**
 *  GET token
 *  gets session token to ensure no repeated questions are fetched
 *  tokens last for six hours
 *  tokens get appended to query string
 *    example: https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
 * () => {token: string}
*/
router.get(`/token/new`,
  async function (req, res, next) {
    try {
      const resp = await axios.get(`${BASE_URL}/api_token.php?command=request`);
      readResponseCode(resp.data.response_code)
      const token = resp.data.token
      return res.json({ token });
    } catch (err) {
      return next(err)}
            })


/**
 *
 * GET list of Categories
 * () => {
 *        categories: [ {id, name},...,{} ]
 *        }
 */
router.get('/categories',
  async function (req, res, next) {
    try {
      const resp = await axios.get(`${BASE_URL}/api_category.php`);
      const categories = resp.data.trivia_categories;
      return res.json({ categories });
    } catch (err) {
      return next(err)}
  })


/**
 * Get Questions matching qString
 * () => {questions:[
 *                     {
 *                      category: str,
 *                      type: str,
 *                      difficulty: str,
 *                      question: str,
 *                      correct_answer: str,
 *                      incorrect_answers: [str,str,str]
 *                     },
 *                     ... ,
 *                     {}]
 */
router.get('/questions',
  async function (req, res, next) {
    const qString = buildQueryStr(req.body)
    try {
      const resp = await axios.get(`${BASE_URL}/api.php?${qString}`);
      readResponseCode(resp.data.response_code)
      const questions = resp.data.results;
      return res.json({ questions })
    } catch (err) {
      return next(err)}
  })

  module.exports = router;
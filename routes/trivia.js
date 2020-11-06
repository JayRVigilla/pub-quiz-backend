/**
 * routes for trivia
 *
 * makes calls to external API Open Trivia
 * https://opentdb.com/api_config.php
 *
 * OR?
 * https://jservice.io/
 *
 * https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
 */


const axios = require('axios');
const express = require('express');
const ExpressError = require('../helpers/expressError');
const router = new express.Router();
const BASE_URL = "https://opentdb.com/"

/**
 * Response Codes
The API appends a "Response Code" to each API Call to help tell developers what the API is doing.

Code 0: Success Returned results successfully.
Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
Code 3: Token Not Found Session Token does not exist.
Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
 */

function readResponseCode(int) {
  const codes = {
    0: ['Success! Returned results successfully.', 200],
    1: ["No Results! Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)", 400],
    2: ["Invalid Parameter! Contains an invalid parameter. Arguments passed in aren't valid. (Ex. Amount = Five)", 400],
    3: ["Token Not Found! Session Token does not exist.", 400],
    4: ["Token Empty Session! Token has returned all possible questions for the specified query. Resetting the Token is necessary.", 418],  // shouldn't happen.
  }
  if (int !== 0) return next(...codes.int)
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
      readResponseCode(resp.response_code)
      const token = resp.token
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
      readResponseCode(resp.response_code)
      const categories = resp.trivia_categories;
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
    try {
      let qString = ""
      for (let key in req.body) qString += `${key}=req.body[${key}]&`
      if (qString[-1] === "&") qString = qString.slice(0, -1)

      const resp = await axios.get(`${BASE_URL}/api.php?${qString}`);
      readResponseCode(resp.response_code)
      const questions = resp.results;
      return res.json({ questions })
    } catch (err) {
      return next(err)}
  })
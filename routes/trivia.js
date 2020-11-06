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

/**
 *  GET token
 *  gets session token to ensure no repeated questions are fetched
 *  tokens last for six hours
 *  tokens get appended to query string
 *    example: https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
*/
router.get(`/token/new`,
  async function (req, res, next) {
    try {
      const resp = await axios.get(`${BASE_URL}/api_token.php?command=request`);
      const token = resp.token
      return res.json({ token });
    } catch (err) {
      return next(err)}
            })


// GET list of Categories
router.get('/categories',
  async function (req, res, next) {
    try {
      const resp = await axios.get(`${BASE_URL}/api_category.php`);
      const categories = resp.trivia_categories;
      return res.json({ categories });
    } catch (err) {
      return next(err)}
  })


// Get Questions from a category
router.get(,
  async function (req, res, next) {
    try {
      let qString = ""
      // iterate req.body
        // forEach key qString += 'key=value&'
      // if last char in qStr === & then remove
      for (let key in req.body) qString += `${key}=req.body[${key}]&`
      if (qString[-1] === "&") qString = qString.slice(0, -1)
      const resp = await axios.get(`${BASE_URL}/api.php?${qString}`);
      const questions = resp.results;
      return res.json({ questions })
    } catch (err) {
      return next(err)}
  })


// Get Questions from random categories
router.get(`${BASE_URL}/api_token.php?amount=50`,
  async function (req, res, next) {
    try {

    } catch (err) {
      return next(err)}
            })
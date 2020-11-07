  /**
   *
   * Quote API
   *  not free, will need to find another one
   * https://quotes.rest/
   *
   *
   *
   */

  const axios = require('axios');
  const express = require('express');
  const ExpressError = require('../helpers/ExpressError');

  const router = new express.Router();

  const BASE_URL = "https://quotes.rest/"
  // GET random quote  https://quotes.rest/qod?language=en
  // GET quote categories https://quotes.rest/qod/categories?language=en&detailed=false
  // GET qutoes from a category
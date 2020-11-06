/**
 * Unit tests for Trivia API routes
 *
 * TODO: mock axios calls
 * https://www.robinwieruch.de/axios-jest
 */

// const axios = require('axios')
const request = require('supertest')
const app = require('../app')
// const trivia = require('../routes/trivia')

// jest.mock('axios')

describe("GET /token/new", () => {
  test("GETs session token from external API", async () => {
    const resp = await request(app)
      .get('/trivia/token/new')

      expect(typeof resp.body.token).toBe("string")
      expect(resp.statusCode).toEqual(200)
      })
}),

describe("GET /categories", () => {
  test("GETs array of categories from external API", async () => {
    const resp = await request(app)
      .get('trivia/categories')
    // console.log('*****  ', resp.error)
      expect(resp.statusCode).toEqual(200)
      expect(typeof resp.body.categories).toBe("object")
      })
  })
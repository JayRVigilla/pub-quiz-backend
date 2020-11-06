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
    const res = await request(app)
      .get('/trivia/token/new')

      expect(typeof res.body.token).toBe("string")
      expect(res.statusCode).toEqual(200)
      })
}),

describe("GET /categories", () => {
  test("GETs array of categories from external API", async () => {
    const res = await request(app)
      .get('/categories')
    // console.log('*****  ', res)
    expect(res.statusCode).toEqual(200)
      // expect(typeof res.body.categories).toBe("object")
      })
  })
/**
 * Unit tests for Trivia API routes
 *
 * TODO: mock axios calls
 * https://www.robinwieruch.de/axios-jest
 */

const request = require('supertest')
const app = require('../app')


describe("GET /token/new", () => {
  test("GETs session token from external API", async () => {
    const resp = await request(app)
      .get('/trivia/token/new')

      expect(typeof resp.body.token).toBe("string")
      expect(resp.statusCode).toEqual(200)
  })

    //handles errors... but what errors?
    test("", async () => { })
}),

describe("GET /categories", () => {
  test("GETs array of category objects from external API", async () => {
    const resp = await request(app)
      .get('/trivia/categories')

    expect(resp.statusCode).toEqual(200)

    const categories = resp.body.categories
    expect(Array.isArray(categories)).toBe(true)
    expect(categories.every( item => typeof item === "object"))
  })

  //handles errors..
  test("", async () => { })
})

describe("GET /questions", () => {
  const goodData = {
    "amount": 10,
    "category": 13,
    "type": "multiple"
  }

  const badData = {
    "AmouNt": 'ten',
    category: 'Thir teern',
    "type": "banana"
  }

  // gets questions with req.body
  test("GETs questions with req.body", async () => {
    const resp = await request(app)
      .get('/trivia/questions')
      .send(goodData)

    expect(resp.statusCode).toEqual(200)

    const questions = resp.body.questions

    // matches expected shape: array of objects
    expect(Array.isArray(questions)).toBe(true)
    expect(questions.every(item => typeof item === "object"))

    // array length matches requested amount of 10
    expect(questions.length).toBe(10)
    // all questions have expected category
    expect(questions.every(q => q.category === "Entertainment: Musicals & Theatres"))
    // all questions are multiple choice
    expect(questions.every(q => q.type === "multiple"))
  })

  // sends error without req.body
  test("throws error without req.body", async () => {
    const resp = await request(app)
    .get('/trivia/questions')
    .send(badData)

    expect(resp.statusCode).toEqual(400)
    const err = resp.error
    expect(err.text.includes("Invalid Parameter!")).toBe(true)
  })
})
const expect = require('jest').expect;
const app = require('./app.js');

describe("/getAll", () => {

  describe("when passed a name to search for", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).fetch("http://localhost:5000/getAll")
        expect(response.statusCode).toBe(200)
      })
    })
    // should match the whole string or a substring of the given name.
    // should respond with a json object that contains the id from the database.
    // should respond with a 200 status code.
    // should specify json as the content type in the http header.

  describe("when passed a name that does not exist", () => {
  // should return a 400 status code to show there was a user error.
  // should return a json object that contains an error message.
  // should specify json as the content type in the http header.
  })
})
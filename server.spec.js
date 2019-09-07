const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  //cross-env DB_ENV=testing
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("returns 200 OK", () => {
      //make a GET request to / on our server
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
      //check that the status code is 200
    });

    it("should return a JSON object", async () => {
      const expectedBody = { hello: "Hello World!" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
});

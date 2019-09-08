const request = require("supertest");
const server = require("./server.js");
const db = require("./api/dbConfig");

describe("server.js", () => {
  //cross-env DB_ENV=testing
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  //Deletes values in table after every test
  beforeEach(async () => {
    await db.raw(`truncate table pairs restart identity cascade`);
  });

  describe("GET /", () => {
    //Deletes values in table after every test
    beforeEach(async () => {
      await db.raw(`truncate table pairs restart identity cascade`);
    });

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

describe("pairs.js route", () => {
  //Deletes values in table after every test
  beforeEach(async () => {
    await db.raw(`truncate table pairs restart identity cascade`);
  });

  describe("POST /api/trading-pairs", () => {
    it("returns 200 OK async", async () => {
      //make a POST request to / on our server
      const response = await request(server)
        .post("/api/trading-pairs")
        .send({ symbol: "ethbtc" });

      expect(response.status).toEqual(200);
    });

    it("returns the id", async () => {
      const expected = [1];
      const response = await request(server)
        .post("/api/trading-pairs")
        .send({ symbol: "ethbtc" });

      expect(response.body).toEqual(expected);
    });
  });

  describe("GET /api/trading-pairs", () => {
    it("returns 200 OK", () => {
      //make a GET request to / on our server
      return request(server)
        .get("/api/trading-pairs")
        .then(res => {
          expect(res.status).toBe(200);
        });
      //check that the status code is 200
    });

    it("should return a JSON object", async () => {
      const response = await request(server).get("/");

      expect(response.type).toMatch(/json/);
    });
  });

  describe("GET /api/trading-pairs/:symbol", () => {
    it("returns 200 OK", async () => {
      //Posts to DB
      await request(server)
        .post("/api/trading-pairs")
        .send({ symbol: "ethbtc" }, { symbol: "btceth" });

      const response = await request(server).get("/api/trading-pairs/ethbtc");
      expect(response.status).toEqual(200);
    });

    it("returns the right object", async () => {
      const expectedBody = { symbol: "ETHBTC", id: 1 };
      //Posts to DB
      await request(server)
        .post("/api/trading-pairs")
        .send({ symbol: "ethbtc" }, { symbol: "btceth" });
      //GET's right pair
      const response = await request(server).get("/api/trading-pairs/ethbtc");

      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("POST ");
});

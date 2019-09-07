const pairsModel = require("./pairsModel.js");
const db = require("../../dbConfig.js");

describe("pairs model", () => {
  //Deletes values in table after every test
  beforeEach(async () => {
    await db("pairs").truncate();
  });

  describe("addPair()", () => {
    it("should insert the pairs into the db", async () => {
      await pairsModel.addPair({ symbol: "ethbtc" });

      const pairs = await db("pairs");

      //Verify that the pair was added
      expect(pairs).toHaveLength(1);
    });

    it("should have be all caps for the symbol", async () => {
      const expectedBody = [{ id: 1, symbol: "ETHBTC" }];
      await pairsModel.addPair({ symbol: "ethbtc" });

      const pairs = await pairsModel.getTradingPairs();

      expect(pairs).toEqual(expectedBody);
    });
  });

  describe("getPairBySymbol()", () => {
    it("should return the right pair", async () => {
      const expectedBody = { id: 1, symbol: "ETHBTC" };
      await pairsModel.addPair({ symbol: "ethbtc" });
      await pairsModel.addPair({ symbol: "bnbbtc" });
      await pairsModel.addPair({ symbol: "trxbtc" });

      let pair = await pairsModel.getPairBySymbol("ethbtc");

      expect(pair).toEqual(expectedBody);
    });
  });
});

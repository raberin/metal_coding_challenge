const db = require("../../dbConfig.js");

const getTradingPairs = () => {
  return db("pairs");
};

const getPairBySymbol = symbol => {
  return db("pairs")
    .where("symbol", symbol.toUpperCase())
    .first();
  //* returns pair with matching symbols
};

const addPair = pairObj => {
  pairObj.symbol = pairObj.symbol.toUpperCase();

  return db("pairs").insert(pairObj, "id");
};

module.exports = {
  getTradingPairs,
  getPairBySymbol,
  addPair
};

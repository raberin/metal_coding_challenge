const db = require("../../dbConfig.js");

const getTradingPairs = () => {
  return db("pairs");
};

const getPairBySymbol = symbol => {
  //Convert symbols to uppercase
  let upperSym = symbol.toUpperCase();
  return db("pairs")
    .where("symbol", upperSym) //* returns pair with matching symbols
    .first();
};

const addPair = symbol => {
  let upperSym = symbol.toUpperCase();
  return db("accounts")
    .insert(upperSym)
    .then(ids => {
      return getAccountById(ids[0]);
    });
};

module.exports = {
  getTradingPairs,
  getPairBySymbol,
  addPair
};

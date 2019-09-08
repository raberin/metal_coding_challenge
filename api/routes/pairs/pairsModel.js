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

const addTickerData = obj => {
  return db("ticker").insert(obj);
};

const removeTickerData = id => {
  return db("ticker")
    .where("id", id)
    .del();
};

const getTickerData = id => {
  return db("ticker")
    .select("data")
    .where("symbol_id", id);
};

const getTickerDataTime = (id, starttime, endtime) => {
  return db.raw(
    `select data from ticker 
    where symbol_id = ${id} 
    and created_at::time between '${starttime}' 
    and '${endtime}'`
  );
};

const truncateData = () => {
  return db("ticker").truncate();
};

module.exports = {
  getTradingPairs,
  getPairBySymbol,
  addPair,
  addTickerData,
  removeTickerData,
  getTickerData,
  truncateData,
  getTickerDataTime
};

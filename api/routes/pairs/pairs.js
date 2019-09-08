//Import express
const express = require("express");

//Import Helper Functions
const pairsModel = require("./pairsModel.js");

//Db
const db = require("../../dbConfig.js");

//Create Router
const router = express.Router();

//Binance API
const Binance = require("binance-api-node").default;
const client = Binance();
client.time().then(time => console.log(time));

//Endpoints
router.get("/", async (req, res) => {
  try {
    const pairs = await pairsModel.getTradingPairs();
    res.status(200).json(pairs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the trading pairs" });
  }
});

router.post("/", async (req, res) => {
  const pair = req.body;
  try {
    const addPair = await pairsModel.addPair(pair);
    res.status(200).json(addPair);
  } catch (err) {
    res.status(500).json({
      message: "Error adding pair"
    });
  }
});

router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const pair = await pairsModel.getPairBySymbol(symbol);
    if (symbol) {
      res.status(200).json(pair);
    } else {
      res.status(404).json({ message: "Invalid Symbol" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving symbol"
    });
  }
});

// const socket = client.ws.ticker(symbol, async ticker => {
//   let ticketJson = {
//     data: ticker,
//     symbol_id: id
//   };
// });

//Opens websocket connection and saves json into data row in ticker table
router.post("/:symbol/ticker", async (req, res) => {
  const { symbol } = req.params;
  const pair = await pairsModel.getPairBySymbol(symbol);
  //Grabs id from get request
  let id = pair.id;

  try {
    //Starts socket
    const socket = client.ws.ticker(symbol, async ticker => {
      let ticketJson = {
        data: ticker,
        symbol_id: id
      };
      const addedTicker = await pairsModel.addTickerData(ticketJson);
      res.status(200).json(addedTicker);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Closes websocket connection
router.delete("/:symbol/ticker", async (req, res) => {
  const { symbol } = req.params;
  const pair = await pairsModel.getPairBySymbol(symbol);
  //Grabs id from get request
  let id = pair.id;

  try {
    //Starts socket
    const socket = client.ws.ticker(symbol, async ticker => {
      console.log(ticker);
    });
    socket;
    const deletedTicker = await pairsModel.removeTickerData(id);
    res.status(200).json(deletedTicker);
  } catch (err) {
    err;
  }
});

//Closes websocket connection
router.delete("/:symbol/ticker/d", async (req, res) => {
  try {
    const deleteData = await pairsModel.truncateData(id);
    res.status(200).json(deleteData);
  } catch (err) {
    err;
  }
});

//Queries Websocket data
router.get("/:symbol/ticker", async (req, res) => {
  const { symbol } = req.params;
  const pair = await pairsModel.getPairBySymbol(symbol);
  //Grabs id from get request
  let id = pair.id;

  try {
    const getTicker = await pairsModel.getTickerData(id);
    res.status(200).json(getTicker);
  } catch (err) {
    err;
  }
});

module.exports = router;

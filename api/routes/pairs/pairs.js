//Import express
const express = require("express");

//Import Helper Functions
const pairsModel = require("./pairsModel.js");

//Db
const db = require("../../dbConfig.js");

//Create Router
const router = express.Router();

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

module.exports = router;

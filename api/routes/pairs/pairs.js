//Import express
const express = require("express");

//Import Helper Functions
const pairsDb = require("./pairsDb.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", async (req, res) => {
  try {
    const pairs = await pairsDb.getTradingPairs();
    res.status(200).json(pairs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the trading pairs" });
  }
});

module.exports = router;

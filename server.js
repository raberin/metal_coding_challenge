const express = require("express");
const server = express();
const cors = require("cors");

//Route Files
const tradingPairsRouter = require("./api/routes/pairs/pairs.js");
// const tickerRouter = require('./api/routes/ticker/ticker.js')

//Init Middleware
server.use(express.json({ extended: true }));
server.use(cors());

//Routes
server.use("/api/trading-pairs", tradingPairsRouter);

//Test Route
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World!" });
});

module.exports = server;

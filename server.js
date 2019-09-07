const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//Route Files
// const tradingPairsRouter = require("./api/routes/tradingPairs");

//Init Middleware
server.use(express.json({ extended: true }));

//Routes
// server.use("/api/v1/trading-pairs", tradingPairsRouter);

//Test Route
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World!" });
});

module.exports = server;

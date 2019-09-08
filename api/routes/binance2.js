const Binance = require("binance-api-node").default;

const client = Binance();

client.time().then(time => console.log(time));

//Runs below, using node binance2.js
const clean = client.ws.ticker("ethbtc", ticker => {
  console.log(ticker);
});

setTimeout(clean, 5000);

//If uncommented, closes connection to websocket after 5secs
// setTimeout(clean, 5000);

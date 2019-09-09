const WebSocket = require("ws");

const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);

ws.on("message", function incoming(data) {
  console.log(data);
  ws.terminate();
});

ws.on("close", () => console.log("closedddd"));

//setTimeout(() => {

//}, 5000);

// console.log("yoo wsssssss", ws);

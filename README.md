# metal_coding_challenge

How to start

1. run yarn install to install all dependencies
2. create 2 postgresql servers in terminal psql

- CREATE DATABASE metal_coding_challenge
- CREATE DATABASE metal_coding_challenge_test

3. yarn server to turn on development server
4. yarn test to turn on test server/suite
5. Postman to test each route

GET http://localhost:5000/api/trading-pairs/ Returns list of pairs

POST http://localhost:5000/api/trading-pairs/ Posts a pair requires {symbol: symbol}
//"ethbtc", ""btcusdt", etc

GET http://localhost:5000/api/trading-pairs/:symbol Returns corresponding pair used in query param

POST http://localhost:5000/api/trading-pairs/:symbol/ticker Posts to backend the websocket data normallly closes connection after 10secs unless specified using a query string
//Closes connection after 5secs
ex: http://localhost:5000/api/trading-pairs/:symbol/ticker?connectiontime=5000

GET http://localhost:5000/api/trading-pairs/:symbol/ticker Returns all the ticker data of the pair unless specified using a query string grabs data from today 12:10:10 -> 12:20:30
ex: http://localhost:5000/api/trading-pairs/:symbol/ticker?starttime=12:10:10&endtime=12:20:30

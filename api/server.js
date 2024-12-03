require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const finnhubController = require('./app/finnhub');
const app = express();

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server);

let finnhubError, socket = finnhubController.initWebSocket()

// ['AMZN', 'APPL', 'NVDA'] dummy stocks for FE list
// todo get stocks on startup and subscribe

if (finnhubError) {
  console.dir(finnhubError)
} else {
  finnhubController.watch(socket, io);
}

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('internal socket io is live!');
})

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const { Watchlist } = db.watchlist;

// Create and Save a new User
app.post("/watch", (req, res) => {

  // Validate request
  if (!req.body.stock_symbol) {
    res.status(400).send({
      message: "Stock Symbol cannot be missing!"
    });
    return;
  }

  // Create a UserStock
  const stock = {
    stock_symbol: req.body.stock_symbol,
    stock_watched: new Date(),
  };

  // Save UserStock in the database
  Watchlist.create(stock)
    .then(data => {
      finnhubController.subscribe(socket, req.body.stock_symbol);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

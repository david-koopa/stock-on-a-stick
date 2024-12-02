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

if (finnhubError) {
  console.dir(finnhubError)
} else {
  finnhubController.open(socket, 'APPL');
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

const { User, UserStock } = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
app.post("/watch", (req, res) => {

  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "User cannot be missing!"
    });
    return;
  }

  if (!req.body.stock_symbol) {
    res.status(400).send({
      message: "Stock Symbol cannot be missing!"
    });
    return;
  }

  // Create a UserStock
  const userStock = {
    user_id: req.body.user_id,
    stock_symbol: req.body.stock_symbol,
    stock_watched: new Date(),
  };

  // Save UserStock in the database
  UserStock.create(userStock)
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

// Create and Save a new User
app.post("/user", (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({
      message: "First name cannot be missing!"
    });
    return;
  }

  // Create a User
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name || null,
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
});

// Retrieve all Users from the database.
app.get("/user", (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving your users."
      });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

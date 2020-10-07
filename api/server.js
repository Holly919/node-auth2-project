const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const errHandler = require('./errorHandler.js');

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "I changed all my passwords to 'Incorrect'. So whenever I forget, it will tell me 'Your password is Incorrect'." });
});

server.use(errHandler);

module.exports = server;

const express = require("express");
const routerContact = require("./contacts");
const routerUsers = require("./users");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/contacts", routerContact());
  routerIndex.use("/users", routerUsers());

  return routerIndex;
};

const express = require("express");
const routerContact = require("./contacts");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/contacts", routerContact());

  return routerIndex;
};
const express = require("express");
const controller = require("../controllers/users");
const { ensureAuthenticated } = require("../middlewares/validateJWT")
const usersRouter = express.Router();

module.exports = () => {
  usersRouter.get("/signup", controller.signUp);
  usersRouter.get("/login", controller.login);
  usersRouter.get("/logout", ensureAuthenticated, controller.signUp);
  usersRouter.get("/current", ensureAuthenticated, controller.signUp);
  return usersRouter;
};

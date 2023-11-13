const express = require("express");
const controller = require("../controllers/users");
const { ensureAuthenticated } = require("../middlewares/validateJWT")
const usersRouter = express.Router();

module.exports = () => {
  usersRouter.post("/signup", controller.signUp);
  usersRouter.post("/login", controller.login);
  usersRouter.post("/logout", ensureAuthenticated, controller.logout);
  usersRouter.get("/current", ensureAuthenticated, controller.currentUser);
  usersRouter.post("/subscription", ensureAuthenticated, controller.updateSubscriptionUser);
  return usersRouter;
};

const express = require("express");
const controller = require("../controllers/users");
const { auth } = require("../middlewares/auth")
const usersRouter = express.Router();

module.exports = () => {
  usersRouter.post("/signup", controller.signUp);
  usersRouter.post("/login", controller.login);
  usersRouter.post("/logout", auth, controller.logout);
  usersRouter.get("/current", auth, controller.currentUser);
  usersRouter.post("/subscription", auth, controller.updateSubscriptionUser);
  return usersRouter;
};

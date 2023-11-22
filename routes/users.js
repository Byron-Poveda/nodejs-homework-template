const express = require("express");
const controller = require("../controllers/users");
const { auth } = require("../middlewares/auth")
const { upload } = require("../middlewares/file")
const usersRouter = express.Router();

module.exports = () => {
  usersRouter.post("/signup", controller.signUp);
  usersRouter.post("/login", controller.login);
  usersRouter.post("/logout", auth, controller.logout);
  usersRouter.get("/current", auth, controller.currentUser);
  usersRouter.post("/subscription", auth, controller.updateSubscriptionUser);
  usersRouter.post("/avatars", auth, upload.single('avatar'), controller.updateAvatarUser);
  return usersRouter;
};

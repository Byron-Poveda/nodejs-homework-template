const express = require("express");
const controller = require("../controllers/contacts");
const { auth } = require("../middlewares/auth")

const contactRouter = express.Router();

module.exports = () => {
  contactRouter.get("/", auth, controller.findContact);
  contactRouter.get('/:id', auth, controller.findIdContact);
  contactRouter.post("/", auth, controller.createContact);
  contactRouter.put("/:id", auth, controller.updateContact);
  contactRouter.delete("/:id", auth, controller.deleteContact);
  contactRouter.patch("/:id/favorite", auth, controller.updateStatusContact);
  return contactRouter;
};

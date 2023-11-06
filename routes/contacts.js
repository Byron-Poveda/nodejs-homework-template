const express = require("express");
const controller = require("../controllers/contacts");

const contactRouter = express.Router();

module.exports = () => {
  contactRouter.get("/", controller.findContact);
  contactRouter.get('/:id', controller.findIdContact);
  contactRouter.post("/", controller.createContact);
  contactRouter.put("/:id", controller.updateContact);
  contactRouter.delete("/:id", controller.deleteContact);
  contactRouter.patch("/:id/favorite", controller.updateStatusContact);
  return contactRouter;
};

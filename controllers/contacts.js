const service = require("../services/contacts");

const findContact = async (req, res) => {
  try {
    const { skip, limit } = req.query;

    const { success, result, message } = await service.findContact(skip, limit);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const findIdContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { success, result, message } = await service.findIdContact(id);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { success, result, message } = await service.createContact(req.body);

    console.log("result:", result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(201).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, result, message } = await service.updateContact(id, req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, result, message } = await service.deleteContact(id);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};
const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("body:", req.body)

    const { success, result, message } = await service.updateStatusContact(id, req.body);

    console.log("result:", result)

    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  findContact,
  findIdContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};

const Contact = require("../models/contacts");

const findContact = async (skip, limit) => {
  try {
    const countContact = await Contact.find().count();
    const contacts = await Contact.find().skip(skip).limit(limit);
    console.log(contacts);

    return {
      success: true,
      result: {
        countContact,
        contacts
      },
      message: "List of contacts",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const findIdContact = async id => {
  try {
    const contact = await Contact.findById(id);
    console.log(contact);

    if (!contact) {
      return {
        success: false,
        result: null,
        message: 'Not found contact',
      };
    }

    return {
      success: true,
      result: contact,
      message: 'contact',
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const createContact = async (Data) => {
  try {
    console.log("Data:", Data);
    const contactRegistered = await Contact.create(Data);

    console.log("contactRegistered:", contactRegistered);

    if (!contactRegistered) {
      return {
        success: false,
        result: null,
        message: "There is an error try creating Contact.",
      };
    }

    return {
      success: true,
      result: contactRegistered,
      message: "Contact registered successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateContact = async (id, data) => {
  try {
    console.log(data);
    const contact = await Contact.findByIdAndUpdate(id, data);

    console.log(contact);

    if (!contact) {
      return {
        success: false,
        result: null,
        message: "There was an error to update Contact.",
      };
    }

    return {
      success: true,
      result: contact,
      message: "The contact was updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);

    console.log(contact);

    return {
      success: true,
      result: contact,
      message: "The contact was deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateStatusContact = async (id, body) => {
  try {

    if(!body.favorite) return {
      success: false,
      result: null,
      message: "missing field favorite",
    }
    
    const contact = await Contact.findByIdAndUpdate(id, body);

    console.log(contact);

    if (!contact) {
      return {
        success: false,
        result: null,
        message: "Not found",
      };
    }

    return {
      success: true,
      result: contact,
      message: "The contact state was updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: "Not found",
    };
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

const service = require("../services/users");
const schemasValidations = require("../schemas")

const signUp = async (req, res) => {
  try {

    const { error } = schemasValidations.schemaUser.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });

    console.log(req.body);

    const { success, result, message } = await service.signUp(req.body);

    console.log(result);
    if (!success) {
      return res.status(409).json({
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

const login = async (req, res) => {
  try {
    const { error } = schemasValidations.schemaUser.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });

    console.log(req.body);

    const { email, password } = req.body

    const { success, result, message } = await service.login(email, password);

    console.log("result:", result);
    console.log("success:", success);
    if (!success) {
      if(message === 'Email or password is wrong.') return res.status(401).json({
        result,
        message,
      });

      res.status(400).json({
        result,
        message,
      })
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

const logout = async (req, res) => {
  try {

    const { success, result, message } = await service.logout(req.user._id);

    console.log("result:", result);
    console.log("success:", success);
    
    if (!success) {
      return res.status(401).json({
        result,
        message,
      });
    }

    return res.status(204).end();

  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const currentUser = async (req, res) => {
  try {

    const { success, result, message } = await service.currentUser(req.user);

    console.log("result:", result);
    console.log("success:", success);
    
    if (!success) {
      return res.status(401).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });

  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateSubscriptionUser = async (req, res) => {
  try {

    const { success, result, message } = await service.updateSubscriptionUser(req.user.token, req.body.subscription);

    console.log("result:", result);
    console.log("success:", success);
    
    if (!success) {
      return res.status(404).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });

  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  currentUser,
  updateSubscriptionUser,
};

const service = require("../services/users");

const signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { success, result, message } = await service.signUp(req.body);

    console.log(result);
    if (message === 'Email in use') {
      return res.status(409).json({
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

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body

    const { success, result, message } = await service.login(email, password);

    console.log("result:", result);
    console.log("success:", success);
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
  signUp,
  login
};

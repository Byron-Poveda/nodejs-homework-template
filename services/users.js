const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment")
const User = require("../models/users");

const signUp = async (Data) => {
  try {
    const user = await User.findOne({
      email: Data.email,
    });

    if (user) {
      return {
        success: false,
        result: null,
        message: "Email in use",
      };
    }

    //Hash password
    const salt = await bcrypt.genSalt();
    Data.password = await bcrypt.hash(Data.password, salt);

    /**
     * pedrito@email.com
     * 123
     *
     * bcrypt.compare()
     */

    console.log(Data.password);

    const createdUser = await User.create(Data);

    return {
      success: true,
      result: createdUser,
      message: "Sign-in successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const login = async (email, password) => {
  try {
    const isUserExist = await User.findOne({
      email: email
    });

    console.log("isUserExist:", isUserExist)

    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "Email or password is incorrect.",
      };
    }

    const validPassword = await bcrypt.compare(password, isUserExist.password);

    console.log("validPassword:", validPassword)

    if (!validPassword) {
      return {
        success: false,
        result: null,
        message: "Email or password is incorrect.",
      };
    }

    const token = jwt.sign(
      {
        fullname: `${isUserExist.name} ${isUserExist.lastname}`,
        id: isUserExist._id,
        rol: isUserExist.rol,
        iat: moment().unix(),
        exp: moment().add(4, "hours").unix(),
      },
      process.env.TOKEN_SECRET
    );

    return {
      success: true,
      result: {
        token
      },
      message: "Login successfully."
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  signUp,
  login
};

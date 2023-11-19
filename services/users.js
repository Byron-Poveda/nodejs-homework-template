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
      email
    });

    console.log("isUserExist:", isUserExist)

    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong.",
      };
    }

    const validPassword = await bcrypt.compare(password, isUserExist.password);

    console.log("validPassword:", validPassword)

    if (!validPassword) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong.",
      };
    }

    const token = jwt.sign(
      {
        id: isUserExist._id,
        email: isUserExist.email,
        iat: moment().unix(),
        exp: moment().add(4, "hours").unix(),
      },
      process.env.TOKEN_SECRET
    );

    const updatedUser = await User.findOneAndUpdate(
      { email: isUserExist.email },
      { $set: { token } },
      { new: true } // Devuelve el usuario actualizado
    );

    console.log("updatedUser:", updatedUser)

    return {
      success: true,
      result: {
        token: updatedUser.token,
      },
      message: "Login successfully."
    }
  } catch (error) {
    console.log("error2:", error)

    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const logout = async (_id) => {
  try {

    await User.findOneAndUpdate(
      { _id },
      { $set: { token: null } },
      { new: true }
    );
      
    return {
      success: true,
      result: {},
      message: '',
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const currentUser = async (user) => {
  try {
    
    const response = {
      email: user.email,
      subscription: user.subscription,
    }

    console.log("response:", response)

    return {
      success: true,
      result: response,
      message: 'Current User Successfully',
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateSubscriptionUser = async (token, subscription) => {
  try {

    if(!subscription || !['starter', 'pro', 'business'].includes(subscription)) return {
      success: false,
      result: null,
      message: "Invalid Subscription Type."
    } 

    console.log("token:", token)

    const isUserExist = await User.findOne({
      token
    });

    console.log("isUserExist:", isUserExist)

    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "Not authorized.",
      };
    }
    
    const userUpdate = await User.findOneAndUpdate(
      { token },
      { subscription },
      { new: true }
    );
      
    return {
      success: true,
      result: userUpdate,
      message: 'The User subscription was updated successfully.',
    }
  } catch (error) {
    console.log("error:", error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  signUp,
  login,
  logout,
  currentUser,
  updateSubscriptionUser,
};

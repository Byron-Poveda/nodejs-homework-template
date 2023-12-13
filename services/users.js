const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment")
const User = require("../models/users");
const gravatar = require('gravatar');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');


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

    const createdUser = await User.create({
      ...Data,
      avatarURL: gravatar.url(Data.email, {s: '100', r: 'x', d: 'retro'}, false),
    });

    console.log("createdUser:", createdUser)

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
      avatarURL: user.avatarURL,
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

const updateAvatarUser = async (token, avatar) => {
  try {

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

    const filePath = path.join(__dirname, '../tmp', avatar.filename);
    const image = await jimp.read(filePath);

    // Modificar el tamaño del archivo 
    await image.resize(250, 250);

    // Guardar el archivo modificado en la carpeta pública
    const publicPath = path.join(__dirname, '../public/avatars', avatar.filename);
    await image.write(publicPath);

    console.log("file:", avatar)

    // Eliminar el archivo temporal
    fs.unlink(filePath, (err) => {
      if (err) {
        return {
          success: false,
          result: null,
          message: `Error al eliminar el archivo ${avatar.filename}:`,
        }
      }
    });
    
    const userUpdate = await User.findOneAndUpdate(
      { token },
      { avatarURL: `/avatars/${avatar.filename}` },
      { new: true }
    );
      
    return {
      success: true,
      result: `avatarURL: ${userUpdate.avatarURL}`,
      message: 'The User avatar was updated successfully.',
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
  updateAvatarUser,
};

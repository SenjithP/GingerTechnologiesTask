import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import { validateUserRegistration } from "../utils/registerValidation.js";
import {generateUserToken} from "../utils/generateToken.js"

//USER REGISTRATION
export const userRegistration = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userMobileNumber } = req.body;

    const validationResult = validateUserRegistration({
      userName,
      userEmail,
      userPassword,
      userMobileNumber,
    });

    if (!validationResult.valid) {
      const error = new Error(validationResult.message);
      error.statusCode = validationResult.statusCode || 500;
      throw error;
    }

    const ifUserExists = await User.findOne({ userMobileNumber });

    if (ifUserExists) {
      const error = new Error("User With This Mobile Number Already Exists");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      const error = new Error("User with this email already exists.");
      error.statusCode = 400;
      throw error;
    } else {
      const hashPassword = await bcrypt.hash(userPassword, 10);
      const user = new User({
        userName,
        userEmail,
        userPassword: hashPassword,
        userMobileNumber,
      });

      const userData = await user.save();

      if (userData) {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//USER LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      const error = new Error("All fields are required.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ userEmail:email });
    if (!user) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 400;
      throw error;
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      user.userPassword
    );

    if (verifiedPassword) {
      generateUserToken(res, user._id);

      res.status(201).json({
        userName: user.userName,
        email:user.userEmail,
        id: user._id,
      });
    } else {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//USER LOGOUT
export const userLogout = async (req, res) => {
  try {
    res.cookie("userjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

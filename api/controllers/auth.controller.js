import jwt from "jsonwebtoken";
import { errorHandler } from "../helper/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// SIGN UP
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //   Handling existing users error
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username or email already exists",
    });
  }
  //   Hashing password using bcryptjs
  const hashedPassword = await bcryptjs.hash(password, 10);

  //   Creating a new User
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find user
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: 365 * 24 + "h",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

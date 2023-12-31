import { errorHandler } from "../helper/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
// UPDATE THE USER
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }
  const { username, email, password, avatar, phoneNumber } = req.body;
  try {
    if (password) {
      password = await bcryptjs.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
          phoneNumber,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// DELETE THE USER
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

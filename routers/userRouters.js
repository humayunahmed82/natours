import express from "express";
import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from "../controllers/userControllers.js";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from "../controllers/authControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.patch("/resetpassword/:token", resetPassword);

// Protect all routes after this middleware
userRouter.use(protect);

userRouter.patch("/updatepassword", updatePassword);
userRouter.get("/me", getMe, getUser);
userRouter.patch("/updateme", updateMe);
userRouter.delete("/deleteme", deleteMe);

// Only admin can access the following routes
userRouter.use(restrictTo("admin"));

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;

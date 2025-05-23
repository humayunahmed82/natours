import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// This function is for get user logged in users.
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// This function is for updating logged in users.
const updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. please use the /updatepassword",
        400,
      ),
    );
  }

  //  2) Filtered out unwanted fields names that are not allwoed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) update user Document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

// This function is for deleting logged in users.
const deleteMe = catchAsync(async (req, res, next) => {
  // 1) User is not deleted from the database
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // 2) Send response
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Create a New user
const createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "Error",
    message: "This ropute is not defined. Please use /signup instead",
  });
});

// get All Users
const getAllUsers = getAll(User);

// Get a Single user
const getUser = getOne(User);

// Update user
const updateUser = updateOne(User);

// Delete user
const deleteUser = deleteOne(User);

export {
  getMe,
  getAllUsers,
  updateMe,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
  createUser,
};

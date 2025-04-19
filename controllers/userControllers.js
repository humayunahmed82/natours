import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

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

const deleteMe = catchAsync(async (req, res, next) => {
  // 1) User is not deleted from the database
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // 2) Send response
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet difined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet difined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet difined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet difined",
  });
};

export {
  getAllUsers,
  updateMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
};

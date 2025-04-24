import Review from "../models/reviewModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

// Set the user and tour id in the body of the request
const setUserAndTourid = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

// get all reviews
const getAllReviews = getAll(Review);

// get a single review
const getReview = getOne(Review);

// create a new Review
const createReview = createOne(Review);

// Delte a Review
const deleteReview = deleteOne(Review);

// Update a Review
const updateReview = updateOne(Review);

export {
  getAllReviews,
  getReview,
  setUserAndTourid,
  createReview,
  deleteReview,
  updateReview,
};

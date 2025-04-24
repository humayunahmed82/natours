import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  setUserAndTourid,
  updateReview,
} from "../controllers/revirewControllers.js";
import { protect, restrictTo } from "../controllers/authControllers.js";

const reviewRouter = express.Router({ mergeParams: true });

// Protect all routes after this middleware
reviewRouter.use(protect);

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setUserAndTourid, createReview);

reviewRouter
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

export default reviewRouter;

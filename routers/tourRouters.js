import express from "express";
import {
  aliasing,
  createTour,
  deleteTour,
  getAllTours,
  getDistances,
  getMonthlyPlan,
  getTour,
  getTourStats,
  getWithIn,
  updateTour,
} from "../controllers/tourControllers.js";
import { protect, restrictTo } from "../controllers/authControllers.js";
import reviewRouter from "./reviewRouters.js";

const tourRouter = express.Router();

// tourRouter.param('id', checkId);

tourRouter.use("/:tourId/reviews", reviewRouter);

tourRouter.route("/top-5-cheap").get(aliasing, getAllTours);
tourRouter.route("/tour-stats").get(getTourStats);

tourRouter
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);

// tours-within/223/center/34.136654,-118.099622/unit/mi
tourRouter
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getWithIn);

tourRouter.route("/distances/:latlng/unit/:unit").get(getDistances);

tourRouter
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);
tourRouter
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

export default tourRouter;

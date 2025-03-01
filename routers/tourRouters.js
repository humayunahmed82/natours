import express from "express";
import {
  aliasing,
  createTour,
  deleteTour,
  getAllTours,
  getMonthlyPlan,
  getTour,
  getTourStats,
  updateTour,
} from "../controllers/tourControllers.js";

const tourRouter = express.Router();

// tourRouter.param('id', checkId);

tourRouter.route("/top-5-cheap").get(aliasing, getAllTours);

tourRouter.route("/tour-stats").get(getTourStats);
tourRouter.route("/monthly-plan/:year").get(getMonthlyPlan);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;

import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

import tourRouter from "./routers/tourRouters.js";
import userRouter from "./routers/userRouters.js";
import AppError from "./utils/appError.js";
import globalErrorHendler from "./controllers/errorControllers.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1) Global Middleware
// Set Security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" })); // limit the size of the body to 10kb}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ], // allow only this parameter to be duplicated
    // remove all other duplicated parameters
  }),
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// text middleware
app.use((req, res, next) => {
  req.requestTitme = new Date().toISOString();

  // console.log(req.headers);

  next();
});

// 2) Route Handler
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "Fail",
  //   message: `can't find ${req.originalUrl} on the server`,
  // });

  // const err = new Error(`can't find ${req.originalUrl} on the server`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHendler);

export { app };

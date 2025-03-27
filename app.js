import express from "express";
import morgan from "morgan";

import tourRouter from "./routers/tourRouters.js";
import userRouter from "./routers/userRouters.js";
import AppError from "./utils/appError.js";
import globalErrorHendler from "./controllers/errorControllers.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1) Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello form the middleware 🙋‍♂️");
  next();
});

app.use((req, res, next) => {
  req.requestTitme = new Date().toISOString();
  next();
});

console.log("X");

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

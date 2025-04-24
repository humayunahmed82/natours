import mongoose from "mongoose";
import "dotenv/config";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🔥🔥 Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

import { app } from "./app.js";

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection successfully!"));

const server = app.listen(port, () => {
  console.log(`Example app listening on port 127.0.0.1:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔥🔥 Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

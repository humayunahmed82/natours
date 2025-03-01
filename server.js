import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection successfully!"));

app.listen(port, () => {
  console.log(`Example app listening on port 127.0.0.1:${port}`);
});

// 105 - Document Middleware

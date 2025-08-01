import app from "./app.js";
import { PORT } from "./constents.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./env",
});

const Port = PORT || 4000;

connectDB()
.then(() => {
  app.listen(Port, () => {
    console.log(`Server is listening at post ${Port}`);
  });
})
.catch((err) => {
    console.error("Connection error", err)
    process.exit(1)
})

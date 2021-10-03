import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./configs/db.js";

//Api endpoints
import { apiDetails } from "./apiDetails.js";

//routes
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

import { notFound, errorHandler } from "./middlewares/errorHandlers.js";

dotenv.config();
const app = express();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/send", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.json(apiDetails);
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on localhost:${PORT}`.yellow
      .bold.underline
  );
});

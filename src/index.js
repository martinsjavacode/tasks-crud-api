import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoute from "./routes/auth.route.js";
import tasksRoute from "./routes/tasks.route.js";

import db from "./models/index.js";

dotenv.config();

db.mongoose.connect(process.env.MONGO_URL);

const dbConnection = db.mongoose.connection;

dbConnection.on("error", (error) => {
  console.log("Error connecting to database: ", error.message);
});

dbConnection.once("open", () => {
  console.log("connection to db established");
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

app.use("/tasks", tasksRoute);

app.use(function (_req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    error: {
      message: err.message,
    },
  });
});

app.get("/", (_req, res) => {
  res.json({ message: "Server active." });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`);
});

const express = require("express");
const dotenv = require("dotenv").config();

const goalsRouter = require("./routers/goalsRouter");
const connectToDb = require("./config/db");
const { errorHandler } = require("./middlewares/errorHandler");

const port = process.env.PORT || 5000;

const server = express();

server.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log(res.statusCode);
  return next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/goals", goalsRouter);

server.use(errorHandler);

connectToDb().then(() => {
  server.listen(port, () => {
    console.log(`Server is listening at port ${port}.`);
  });
});

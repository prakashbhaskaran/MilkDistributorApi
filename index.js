const express = require("express");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const cors = require("cors");

const orderRouter = require("./Routes/orderRoutes");

dotenv.config({ path: "./Config/config.env" });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", orderRouter);

mongoose.connect(
  `${process.env.MONGO_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected");
  }
);

app.listen(process.env.PORT || 8000);

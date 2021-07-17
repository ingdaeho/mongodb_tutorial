const express = require("express");
const mongoose = require("mongoose");
const { userRouter, blogRouter } = require("./routes");
const { generateFakeData } = require("../faker2");

const app = express();

const server = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI is required");

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // mongoose.set("debug", true);
    console.log("Mongodb Connected");

    app.use(express.json());

    app.use("/user", userRouter);
    app.use("/blog", blogRouter);

    app.listen(3000, async () => {
      console.log("server listening on port 3000");
      // await generateFakeData(10, 2, 10);
    });
  } catch (err) {
    console.log(err);
  }
};

server();

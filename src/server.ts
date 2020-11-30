import express from "express";
import compression from "compression";
import cors from "cors";
import bluebird from "bluebird";
import mongoose from "mongoose";

import * as TestController from "./controllers/TestController";

import { PORT, terminateOnDBDisconnect } from "./config";
import { mongodbURI } from "./config/secrets";

mongoose.Promise = bluebird;

mongoose.connection
  .on("connected", (event) => {
    console.log(">> Mongoose connected to", mongodbURI);
  })
  .on("disconnected", (event) => {
    console.warn(">> [WARN] Connection to MongoDB terminated");
    if (terminateOnDBDisconnect) {
      console.warn(">> Terminating server with code [1001]");
      process.exit(1001);
    }
  })
  .on("reconnected", (event) => {
    console.info(">> Mongoose reconnected to", mongodbURI);
  })
  .on("reconnectFailed", (event) => {
    console.error(">> [CRITICAL] Mongoose failed to reconnect!");
    console.error("   [CRITICAL] Terminating server with code [1002]");
    process.exit(1002);
  });

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 60000,
  })
  .then(() => {
    console.log(">> Mongoose connected successfully");
    console.log(
      "   [CONFIG] Terminate on database disconnect: ",
      terminateOnDBDisconnect
    );
  });

const server = express();

server.use(compression());
server.use(cors());

server.get("/test", TestController.index);

server.get("/", (req, res) => {
  return res.send("OK");
});

server.listen(PORT || 3000, () => {
  console.log("Server listening at port " + (PORT || 3000));
});

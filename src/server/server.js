import express from "express";
import { Server } from "http";
import { makeStore } from "./store";
import listenWebSocket from "./io";

const app = express();
const http = Server(app);

// config
const rootPath = require("path").normalize(__dirname + "/../..");
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(express.static(rootPath + "/public"));

const io = require("socket.io")(http);
const store = makeStore();
listenWebSocket(io, store);


app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});

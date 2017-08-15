import IO from "socket.io-client";

const socket = IO("http://localhost:3000");

socket.on("disconnect", () => {
  console.log("user disconnected");
});

export default socket;

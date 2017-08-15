const DEFAULT_ROOM = "0";

function switchRoom(socket, roomId) {
  Object.keys(socket.rooms).forEach((Id, index) => {
    console.log('should leave room , skip first one');
    socket.leave(Id);
  });
  setTimeout(() => {
    socket.join(roomId);
  }, 500);
}

export default function listenWebSocket(io, store) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("state", store.getState());
    socket.join(DEFAULT_ROOM);
    socket.on("action", (action) => {
      switch (action.type) {
        case "SWITCH_ROOM":
          return switchRoom(socket, action.roomId || DEFAULT_ROOM);
        case "NEW_MESSAGE":
          if (Object.keys(socket.rooms) && Object.keys(socket.rooms).length > 0) {
            Object.keys(socket.rooms).forEach((id) => {
              socket.to(id).emit("message", action.message);
            });
          } else {
            socket.emit("message", action.message);
          }
          break;
        default:
          store.dispatch(action);
          socket.emit("state", store.getState());
          if (["ADD_ROOM", "REMOVE_ROOM"].indexOf(action.type) > -1) {
            socket.broadcast.emit("state", store.getState());
          }
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

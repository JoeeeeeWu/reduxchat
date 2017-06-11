export function addRoom(room) {
  return {
    type: "ADD_ROOM",
    room,
  };
}

export function removeRoom(payload) {
  return {
    type: "REMOVE_ROOM",
    payload,
  };
}

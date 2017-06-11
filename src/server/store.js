import { createStore } from "redux";
import { fromJS } from "immutable";

import coreReducer from "./reducer";

export const DEFAULT_STATE = fromJS({
  rooms: [{
    name: "公开房间",
    id: "0",
  }],
});

export function makeStore(state = DEFAULT_STATE) {
  return createStore(coreReducer, state);
}

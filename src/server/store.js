import { createStore } from "redux";
import { fromJS } from "immutable";

import coreReducer from "./reducer";

const DEFAULT_STATE = fromJS({
  rooms: [{
    id: "0",
    name: "公开房间",
  }],
});

const store = createStore(coreReducer, DEFAULT_STATE);

export default store;

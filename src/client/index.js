import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import socket from "./io";
import { logger, socketMiddleware } from "./middleware";

import App from "./components/App";
import rootReducer from "./reducer";
import { setState, newMessage } from "./actionCreator";
import { getInitialState, saveToStorage } from "./store";

const createStoreWithMiddleware = applyMiddleware(
  logger,
  socketMiddleware(socket),
)(createStore);

const store = createStoreWithMiddleware(rootReducer, getInitialState());

socket.on("state", (state) => {
  store.dispatch(setState(state));
});

socket.on("message", (message) => {
  console.log("get message from server");
  store.dispatch(newMessage(message, true));
});

const $app = document.getElementById("app");

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    $app,
  );
}

render();

store.subscribe(() => {
  saveToStorage(store.getState());
});

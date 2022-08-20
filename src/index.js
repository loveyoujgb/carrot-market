import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import { store } from './store/config';
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { cryptoApi } from "./services/CryptoApi";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

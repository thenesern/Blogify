import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PostsList from "./components/PostsList";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/posts" element={<PostsList />} />
        <Route path="/" element={<App />} />
        {/*  <Route path="/" element={<Navigate to="/posts" />} /> */}
      </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);

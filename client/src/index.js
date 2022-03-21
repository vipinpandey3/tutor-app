import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ExamContextProvider } from "./context/exam-context";
import { DashboardContextProvider } from "./context/dashboard-context";
import {Provider} from 'react-redux'
import store from './redux/store'
import { AuthContextProvider } from "./context/auth-context";


ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
    <DashboardContextProvider>
        <Router>
          <App />
        </Router>
    </DashboardContextProvider>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

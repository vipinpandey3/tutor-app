import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { StudentContextPorvider } from "./context/student-context";
import { FeesContextProvider } from "./context/fees-context";
import { ExamContextProvider } from "./context/exam-context";

ReactDOM.render(
  <StudentContextPorvider>
    <FeesContextProvider>
      <ExamContextProvider>
        <Router>
          <App />
        </Router>
      </ExamContextProvider>
    </FeesContextProvider>
  </StudentContextPorvider>,
  document.getElementById("root")
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

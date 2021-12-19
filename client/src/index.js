import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserAuthStatus } from "./UserAuthContext";
import { isUserAunthenticated } from "./IsUserAuth";

ReactDOM.render(
  <React.StrictMode>
    <UserAuthStatus.Provider value={{isUserLoggedIn:isUserAunthenticated}}>
      <App />
    </UserAuthStatus.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import "normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import history from "./history";

export const store = configureStore();

const jsx = (
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <AppRouter />
    {/* </BrowserRouter> */}
  </Provider>
);

let hasRendered = false;
const render = () => {
  if (!hasRendered) {
    hasRendered = true;
    ReactDOM.render(jsx, document.getElementById("app"));
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

onAuthStateChanged(auth, (user) => {
  // Check for user status
  if (user) {
    console.log("log in", user.uid);
    store.dispatch(login(user.uid));
    // store.dispatch();
    store.dispatch(startSetExpenses()).then(() => {
      render();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    console.log("log out");
    store.dispatch(logout());
    // if (history.location.pathname !== "/") {
    //   // history.push("/dashboard");
    //   history.push("/");
    // }
    // hasRendered && history.push("/");
    render();
    // history.push({
    //   pathname: "/"
    // });
    // history.push("/");
  }
});

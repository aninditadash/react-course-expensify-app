import React from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
// import { createBrowserHistory } from "history";

import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import EditExpensePage from "../components/EditExpensePage";
import AddExpensePage from "../components/AddExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import history from "../history";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// const history = createBrowserHistory();

const AppRouter = () => (
  // <Router location={history.location} history={history}>
  <Router location={history.location} navigator={history}>
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<ExpenseDashboardPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/create" element={<AddExpensePage />} />
      </Route>
      {/* <Route path="/create" element={<AddExpensePage />} /> */}
      <Route element={<PrivateRoute />}>
        <Route path="/edit" element={<EditExpensePage />}>
          <Route path=":id" element={<EditExpensePage />} />
        </Route>
      </Route>
      <Route path="/help" element={<HelpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRouter;

// export { history };

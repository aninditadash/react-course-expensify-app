import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";

// import { history } from "../routers/AppRouter";

// import history from "../history";

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink
      to="/dashboard"
      className={({ isActive }) => (isActive ? "is-active" : undefined)}
    >
      Dashboard
    </NavLink>
    <NavLink
      to="/create"
      className={({ isActive }) => (isActive ? "is-active" : undefined)}
    >
      Create Expense
    </NavLink>
    <NavLink
      to="/edit"
      className={({ isActive }) => (isActive ? "is-active" : undefined)}
    >
      Edit Expense
    </NavLink>
    <NavLink
      to="/help"
      className={({ isActive }) => (isActive ? "is-active" : undefined)}
    >
      Help
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapStateToProps = (dispatch) => ({
  startLogout: () => {
    // history.push("/");
    return dispatch(startLogout());
  }
});

export default connect(undefined, mapStateToProps)(Header);

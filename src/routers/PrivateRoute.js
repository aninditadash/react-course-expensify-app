import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header";

export const PrivateRoute = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

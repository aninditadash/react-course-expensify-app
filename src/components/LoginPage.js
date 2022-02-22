import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
// import { useNavigate } from "react-router-dom";

// import history from "../history";
// import { store } from "../app";

// import { history } from "../routers/AppRouter";

export const LoginPage = ({ startLogin }) => {
  // const navigate = useNavigate();

  //   const onSubmit = (expense) => {
  //     props.startAppExpense(expense);
  //     navigate("/");
  //   };
  // debugger;

  // const login = () => {
  //   startLogin();
  //   // navigate("/dashboard");
  // };

  return (
    <div>
      Login Page
      <button onClick={startLogin}>Login</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
  // {
  //   // store.dispatch(startLogin()).then(() => {
  //   //   render();
  //   //   if (history.location.pathname === "/") {
  //   //     history.push("/dashboard");
  //   //   }
  //   // });
  //   // navigate("/dashboard");
  //   return .then(() => {
  //     // debugger;
  //     // navigate("/dashboard");
  //     // history.push("/dashboard");
  //   });
  // }
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

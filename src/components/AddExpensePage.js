import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";
import { startAppExpense } from "../actions/expenses";

export const AddExpensePage = (props) => {
  const navigate = useNavigate();

  const onSubmit = (expense) => {
    props.startAppExpense(expense);
    navigate("/");
  };

  return (
    <>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAppExpense: (expense) => dispatch(startAppExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

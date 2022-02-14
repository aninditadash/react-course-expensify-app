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
    <div>
      This is from my add expense component
      <h1>Add Expense</h1>
      <ExpenseForm onSubmit={onSubmit} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAppExpense: (expense) => dispatch(startAppExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

import React from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";

import { editExpense, removeExpense } from "../actions/expenses";

export const EditExpensePage = (props) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const selectedExpense = props.expenses.find((expense) => expense.id === id);

  const onSubmit = (expense) => {
    props.editExpense(id, expense);
    navigate("/");
  };

  const onRemove = () => {
    props.removeExpense({ id });
    navigate("/");
  };

  return (
    <div>
      <ExpenseForm expense={selectedExpense} onSubmit={onSubmit} />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

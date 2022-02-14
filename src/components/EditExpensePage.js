import React from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";

import {
  editExpense,
  startRemoveExpense,
  startEditExpense
} from "../actions/expenses";

export const EditExpensePage = (props) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const selectedExpense = props.expenses.find((expense) => expense.id === id);

  const onSubmit = (expense) => {
    props.startEditExpense(id, expense);
    navigate("/");
  };

  const onRemove = () => {
    props.startRemoveExpense({ id });
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
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

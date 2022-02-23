import React from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";

import { startRemoveExpense, startEditExpense } from "../actions/expenses";

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
    <>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm expense={selectedExpense} onSubmit={onSubmit} />
        <button className="button button--secondary" onClick={onRemove}>
          Remove Expense
        </button>
      </div>
    </>
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

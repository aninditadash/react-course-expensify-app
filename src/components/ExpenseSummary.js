import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          {expenseCount > 1 ? (
            <p className="page-header__title-bold">
              Viewing {expenseCount} expenses totalling{" "}
              <span>{numeral(expensesTotal).format("$0,0.00")}</span>
            </p>
          ) : (
            <p>
              Viewing {expenseCount} expense totalling{" "}
              <span>{numeral(expensesTotal).format("$0,0.00")}</span>
            </p>
          )}
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenseCount: selectExpenses(state.expenses, state.filters).length,
  expensesTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpenseSummary);

import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  return (
    <div>
      <h1>
        {expenseCount > 1 ? (
          <p>
            Viewing {expenseCount} expenses totalling{" "}
            {numeral(expensesTotal).format("$0,0.00")}
          </p>
        ) : (
          <p>
            Viewing {expenseCount} expense totalling{" "}
            {numeral(expensesTotal).format("$0,0.00")}
          </p>
        )}
      </h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenseCount: selectExpenses(state.expenses, state.filters).length,
  expensesTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpenseSummary);

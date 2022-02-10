import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../src/components/ExpenseSummary";
import expenses from "../fixtures/expenses";

test("ExpenseSummary Component: Should render ExpenseSummary with 1 expense", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={1} expensesTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseSummary Component: Should render ExpenseSummary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={expenses.length} expensesTotal={12500} />
  );
  expect(wrapper).toMatchSnapshot();
});

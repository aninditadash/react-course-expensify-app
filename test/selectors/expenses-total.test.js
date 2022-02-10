import getExpensesTotal from "../../src/selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("Test getExpensesTotal(): Should return 0 for no expenses", () => {
  const totalExpense = getExpensesTotal([]);
  expect(totalExpense).toBe(0);
});

test("Test getExpensesTotal(): Should correctly add up a single expense", () => {
  const totalExpense = getExpensesTotal(expenses[0]);
  expect(totalExpense).toBe(expenses[0].amount);
});

test("Test getExpensesTotal(): Should correctly add up multiple expenses", () => {
  const totalExpense = getExpensesTotal(expenses);
  expect(totalExpense).toBe(12500);
});

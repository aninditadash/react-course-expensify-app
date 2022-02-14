import moment from "moment";

import expensesReducer from "../../src/reducers/expenses";
import expenses from "../fixtures/expenses";

test("Expenses Reducer: Should setup default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("Expenses Reducer: Should remove expenses by id", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Expenses Reducer: Should not remove expenses if id is not found", () => {
  const action = { type: "REMOVE_EXPENSE", id: "-1" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Expenses Reducer: Should add an expense", () => {
  const expense = {
    id: "109",
    description: "Laptop Bill",
    amount: 122500,
    note: "This is the bill for the new laptop",
    createdAt: moment(0).add(400, "days").valueOf()
  };
  const action = { type: "ADD_EXPENSE", expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("Expenses Reducer: Should edit an expense", () => {
  const updates = {
    description: "Monthly Water bill",
    amount: 4500,
    note: "This is the monthly water bill"
  };
  const action = { type: "EDIT_EXPENSE", id: expenses[0].id, updates };
  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual({ ...expenses[0], ...updates });
});

test("Expenses Reducer: Should not edit an expense if expense not found", () => {
  const updates = {
    description: "Monthly Water bill",
    amount: 4500,
    note: "This is the monthly water bill"
  };
  const action = { type: "EDIT_EXPENSE", id: "-1", updates };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Expenses Reducer: Should not edit an expense if expense not found", () => {
  const action = { type: "SET_EXPENSES", expenses: [expenses[1]] };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

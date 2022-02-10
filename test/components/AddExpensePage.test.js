import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../src/components/AddExpensePage";
import expenses from "../fixtures/expenses";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}));

let addExpense, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  wrapper = shallow(<AddExpensePage addExpense={addExpense} />);
});

test("AddExpensePage Component: Should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("AddExpensePage Component: Should handle addExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(mockedUsedNavigate).toHaveBeenLastCalledWith("/");
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});

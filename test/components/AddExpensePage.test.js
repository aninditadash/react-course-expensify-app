import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../src/components/AddExpensePage";
import expenses from "../fixtures/expenses";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate
}));

let startAppExpense, wrapper;

beforeEach(() => {
  startAppExpense = jest.fn();
  wrapper = shallow(<AddExpensePage startAppExpense={startAppExpense} />);
});

test("AddExpensePage Component: Should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("AddExpensePage Component: Should handle addExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(mockedUsedNavigate).toHaveBeenLastCalledWith("/");
  expect(startAppExpense).toHaveBeenLastCalledWith(expenses[1]);
});

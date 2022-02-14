import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../src/components/EditExpensePage";
import expenses from "../fixtures/expenses";

const id = "2";
const mockedUsedNavigate = jest.fn();
const mockedUsedParams = { id };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUsedParams
}));

let startEditExpense, startRemoveExpense, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  wrapper = shallow(
    <EditExpensePage
      expenses={expenses}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
    />
  );
});

test("EditExpensePage Component: Should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
  expect(mockedUsedParams.id).toBe(id);
});

test("EditExpensePage Component: Should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expenses[1].id,
    expenses[1]
  );
  expect(mockedUsedNavigate).toHaveBeenLastCalledWith("/");
});

test("EditExpensePage Component: Should handle removeExpense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
  expect(mockedUsedNavigate).toHaveBeenLastCalledWith("/");
});

import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../src/components/ExpenseForm";
import expenses from "../fixtures/expenses";

const noop = () => {};

test("ExpenseForm Component: Should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseForm Component: Should render ExpenseForm correctly with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseForm Component: Should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: noop
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper.state("error")).toBe("Please provide description and amount.");
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseForm Component: Should set description on input change", () => {
  const value = "This is a test description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#expense-description").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("description")).toBe(value);
});

test("ExpenseForm Component: Should set note on input change", () => {
  const value = "This is a test note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#expense-note").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("ExpenseForm Component: Should set amount if valid amount", () => {
  const value = "23.5";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#expense-amount").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("ExpenseForm Component: Should not set amount if invalid amount", () => {
  const value = "12.222";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#expense-amount").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).not.toBe(value);
  expect(wrapper.state("amount")).toBe("");
});

test("ExpenseForm Component: Should call onSubmit() prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: noop
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test("ExpenseForm Component: Should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("ExpenseForm Component: Should set focus on change", () => {
  const focused = false;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});

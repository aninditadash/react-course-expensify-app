import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "../../src/components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("ExpenseListItem Component: Should render ExpenseListItem with expense 1", () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseListItem Component: Should render ExpenseListItem with expense 2", () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

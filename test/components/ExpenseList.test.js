import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../src/components/ExpenseList";
import expenses from "../fixtures/expenses";

test("ExpenseList Component: Should render ExpenseList with expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseList Component: Should render ExpenseList with empty message", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});

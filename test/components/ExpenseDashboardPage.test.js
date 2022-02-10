import React from "react";
import { shallow } from "enzyme";
import ExpenseDashboardPage from "../../src/components/ExpenseDashboardPage";

test("ExpenseDashboardPage Component: Should render ExpenseDashboardPage correctly", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});

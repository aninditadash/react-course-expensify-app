import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../src/components/LoginPage";

let startLogin, wrapper;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

test("LoginPage Component: Should render LoginPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("LoginPage Component: Should render LoginPage correctly", () => {
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalled();
});

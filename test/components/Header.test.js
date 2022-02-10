import React from "react";
import { shallow } from "enzyme";
import Header from "../../src/components/Header";

test("Header Component: Should render Header correctly", () => {
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  // console.log(renderer.getRenderOutput());

  // const wrapper = shallow(<Header />);
  // expect(wrapper.find("h1").length).toBe(1);
  // expect(wrapper.find("h1").text()).toBe("Expensify");

  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

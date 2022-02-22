import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../src/components/Header";

// const { createBrowserHistory } = require("history");
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

// const history = createBrowserHistory({ forceRefresh: true });

// sinon.spy(history, "push");

let startLogout, wrapper;

// const id = "2";
// const createBrowserHistoryFn = jest.fn();
// const mockedUsedParams = { id };

// jest.mock("history", () => ({
//   ...jest.requireActual("history"),
//   createBrowserHistory: () => createBrowserHistoryFn
//   // useParams: () => mockedUsedParams
// }));

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test("Header Component: Should render Header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Header Component: Should call startLogout on button click", () => {
  wrapper.find("button").simulate("click");
  expect(startLogout).toHaveBeenCalled();
});

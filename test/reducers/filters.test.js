import moment from "moment";
import filtersReducer from "../../src/reducers/filters";

test("Filters Reducer: Should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("Filters Reducer: Should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("Filters Reducer: Should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("Filters Reducer: Should set text filter", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const text = "rent";
  const action = { type: "SET_TEXT_FILTER", text };
  const state = filtersReducer(currentState, action);
  expect(state.text).toBe(text);
});

test("Filters Reducer: Should set startDate filter", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const startDate = moment(0).add(4, "days");
  const action = { type: "SET_START_DATE", startDate };
  const state = filtersReducer(currentState, action);
  expect(state.startDate).toBe(startDate);
});

test("Filters Reducer: Should set endDate filter", () => {
  const currentState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const endDate = moment(0).subtract(4, "days");
  const action = { type: "SET_END_DATE", endDate };
  const state = filtersReducer(currentState, action);
  expect(state.endDate).toBe(endDate);
});

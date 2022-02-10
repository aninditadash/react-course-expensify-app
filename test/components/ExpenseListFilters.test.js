import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../src/components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("ExpenseListFilters Component: Should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseListFilters Component: Should render ExpenseListFilters with alt data correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("ExpenseListFilters Component: Should handle text change", () => {
  const value = altFilters.text;
  wrapper.find("#expenseList-text-filter").simulate("change", {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("ExpenseListFilters Component: Should sort by date", () => {
  const value = "date";
  wrapper.setProps({ filters: altFilters });
  wrapper.find("#expenseList-sort-filter").simulate("change", {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test("ExpenseListFilters Component: Should sort by amount", () => {
  const value = "amount";
  wrapper.find("#expenseList-sort-filter").simulate("change", {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test("ExpenseListFilters Component: Should handle date changes", () => {
  const startDate = altFilters.startDate;
  const endDate = altFilters.endDate;
  expect(wrapper).toMatchSnapshot();
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate,
    endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("ExpenseListFilters Component: Should handle date focus changes", () => {
  const calendarFocused = "endDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(
    calendarFocused
  );
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});

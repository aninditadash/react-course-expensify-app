import moment from "moment";
import getVisibleExpenses from "../../src/selectors/expenses";
import expenses from "../fixtures/expenses";

test("Test getVisibleExpenses(): Should filter expenses by text value", () => {
  const filters = {
    text: "e",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result.length).toBe(2);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("Test getVisibleExpenses(): Should filter expenses by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result.length).toBe(2);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("Test getVisibleExpenses(): Should filter expenses by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).add(3, "days")
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result.length).toBe(2);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("Test getVisibleExpenses(): Should sort expenses by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result.length).toBe(3);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("Test getVisibleExpenses(): Should sort expenses by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result.length).toBe(3);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

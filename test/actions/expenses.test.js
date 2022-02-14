import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAppExpense
} from "../../src/actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../src/firebase/firebase";
import {
  ref,
  set,
  update,
  remove,
  get,
  child,
  onValue,
  off,
  push,
  onChildRemoved,
  onChildChanged,
  onChildAdded
} from "firebase/database";

const createMockStore = configureMockStore([thunk]);

test("Expenses Selector: Should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("Expenses Selector: Should setup edit expense action object", () => {
  const action = editExpense("123abc", {
    description: "This is a new description",
    amount: 100.0
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "This is a new description",
      amount: 100.0
    }
  });
});

test("Expenses Selector: Should setup add expense action object", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Expenses Selector: Should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Phone bill",
    amount: 130,
    note: "This is a note",
    createdAt: 1000
  };
  const dbRef = ref(database, "expenses");
  store
    .dispatch(startAppExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return get(child(dbRef, `${actions[0].expense.id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("Expenses Selector: Should add expense with defaults to database and store", () => {
  const store = createMockStore({});
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };
  const dbRef = ref(database, "expenses");
  store
    .dispatch(startAppExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return get(child(dbRef, `${actions[0].expense.id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

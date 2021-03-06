import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAppExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../src/actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../src/firebase/firebase";
import { ref, set, get, child } from "firebase/database";

const uid = "test_user_uid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);
const dbRef = ref(database, `users/${uid}/expenses`);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = {
      description,
      note,
      amount,
      createdAt
    };
  });
  set(dbRef, expenseData).then(() => done());
});

test("Expenses Action Selector: Should setup remove expense action object", () => {
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

test("Expenses Action Selector: Should setup add expense action object", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Expenses Action Selector: Should setup set expense action object", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("Expenses Action Selector: Should fetch expenses from database", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("Expenses Action Selector: Should remove expense to database and store for a valid expense id", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return get(child(dbRef, id));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("Expenses Action Selector: Should edit the expense in the database", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {
    amount: 4000
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return get(child(dbRef, id));
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toEqual(updates.amount);
      done();
    });
});

test("Expenses Action Selector: Should add expense to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Phone bill",
    amount: 130,
    note: "This is a note",
    createdAt: 1000
  };

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

test("Expenses Action Selector: Should add expense with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };
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

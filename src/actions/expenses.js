import { v4 as uuidv4 } from "uuid";

import database from "../firebase/firebase";
import { ref, set, push } from "firebase/database";

// Action generators for EXPENSES

// Normal application flow in redux
// component calls action generator
// component dispatches object
// redux store changes
//

// saving data to Firebase ----->
// component calls action generator
// component dispatches function
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
// export const addExpense = ({
//   description = "",
//   note = "",
//   amount = 0,
//   createdAt = 0
// } = {}) => ({
//   type: "ADD_EXPENSE",
//   expense: {
//     id: uuidv4(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });

export const addExpense = (expense = {}) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAppExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    const dataRef = push(ref(database, "expenses"));
    return set(dataRef, expense).then(() => {
      dispatch(
        addExpense({
          id: dataRef.key,
          ...expense
        })
      );
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

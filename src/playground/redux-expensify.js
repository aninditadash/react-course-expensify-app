store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -1000 })
);

const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 200, createdAt: -21000 })
);

const expenseThree = store.dispatch(
  addExpense({ description: "Mobile", amount: 1000 })
);

// store.dispatch(
//   removeExpense({
//     id: expenseTwo.expense.id
//   })
// );

// store.dispatch(editExpense(expenseOne.expense.id, { amount: 10000 }));

// store.dispatch(setTextFilter("M"));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());

store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));

// store.dispatch(setStartDate());

// store.dispatch(setEndDate());

// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [
    {
      id: 1,
      description: "January rent",
      note: "this is a january rent",
      amount: 54600,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};

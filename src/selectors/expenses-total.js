const getExpensesTotal = (expenses) => {
  if (!Array.isArray(expenses)) {
    expenses = [expenses];
  }
  return expenses.reduce((acc, a) => {
    return acc + a.amount;
  }, 0);
};

export default getExpensesTotal;

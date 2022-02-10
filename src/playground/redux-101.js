import { createStore } from "redux";

// action generators - functions that return action objects

const incrementCount = (payload = {}) => ({
  ...payload,
  type: "INCREMENT"
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  decrementBy
});

const setCount = ({ count = 1 } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

// Reducers
// 1. Reducers are pure functions.
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  if (action.type === "INCREMENT") {
    const incrementBy = action.incrementBy | 1;
    return {
      count: state.count + incrementBy
    };
  } else if (action.type === "DECREMENT") {
    const decrementBy = action.decrementBy | 1;
    return {
      count: state.count - decrementBy
    };
  } else if (action.type === "RESET") {
    return {
      count: 0
    };
  } else if (action.type === "SET") {
    return {
      count: action.count
    };
  }
  return state;
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Actions

store.dispatch(incrementCount());

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

// unsubscribe();

store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));

store.dispatch(resetCount());

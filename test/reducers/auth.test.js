import authReducer from "../../src/reducers/auth";

test("Auth Reducer: Should setup default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("Auth Reducer: Should setup uid for login", () => {
  const uid = "1";
  const action = { type: "LOGIN", uid };
  const state = authReducer(undefined, action);
  expect(state).toEqual({ uid });
});

test("Auth Reducer: Should clear uid for logout", () => {
  const action = { type: "LOGOUT" };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});

import { login, logout } from "../../src/actions/auth";

test("Auth Action Selector: Should generate login action object", () => {
  const uid = "1";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("Auth Action Selector: Should generate logout action object", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});

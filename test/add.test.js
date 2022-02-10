const add = (a, b) => a + b;

const generateGreeting = (name = "Anonymous") => `Hello ${name}!`;

test("Should add two numbers", () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test("Should display greeting for given name", () => {
  const result = generateGreeting("Anne");
  expect(result).toBe("Hello Anne!");
});

test("Should display greeting for no name", () => {
  const result = generateGreeting();
  expect(result).toBe("Hello Anonymous!");
});

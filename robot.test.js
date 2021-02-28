const { place, move, report, left, right } = require("./robot");

// example a
test("0,0,'north'", () => {
  expect(move()).toBe("0, 1, 'north'");
});
// example b
test("if this origin position is 0, 0, 'north', after run left()", () => {
  expect(left()).toBe("0, 0, 'west'");
});

// example c
test("1,2,east", () => {
  expect(move()).toBe("2, 2, 'east'");
  expect(move()).toBe("3, 2, 'east'");
  expect(left()).toBe("3, 2, 'north'");
  expect(move()).toBe("3, 3, 'north'");
});

// extra sample to test
test("currentStatus is x: 2, y:3, f: 'east'", () => {
  expect(currentStatus()).toBe("x: 2, y:3, f: 'east'");
});

test("The number is integer", () => {
  expect(isInt()).toBe(4);
});

test("test robot not placed on table, cmd should be ignored", () => {
  expect(move()).toBe("6, 5, 'north'");
});

test("test preventing falling from table", () => {
  expect(move()).toBe("0, 0, 'south'");
});

test("if this origin position is 3, 4, 'east', after run left()", () => {
  expect(right()).toBe("3, 4, 'south'");
});

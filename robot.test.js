const { place, move, report, left, right, getStatus } = require("./robot");

test("bad place and good place", () => {
  place(1, 9, "north");
  expect(getStatus()).toEqual({});
  place(1, 2, "north");
  expect(getStatus()).toEqual({ x: 1, y: 2, f: "north" });
});


test("if this origin position is 0, 0, 'north', after run left", () => {
  place(0, 0, "north");
  left();
  expect(getStatus()).toEqual({ x: 0, y: 0, f: "west" });
});

test("move, left, right", () => {
  place(1, 2, "north");
  move();
  expect(getStatus()).toEqual({ x: 1, y: 3, f: "north" });

  left();
  expect(getStatus()).toEqual({ x: 1, y: 3, f: "west" });
  move();
  expect(getStatus()).toEqual({ x: 0, y: 3, f: "west" });
  move();
  expect(getStatus()).toEqual({ x: 0, y: 3, f: "west" });
  right();
  expect(getStatus()).toEqual({ x: 0, y: 3, f: "north" });
});

test("preventing falling from table", () => {
  place(0, 0, "south");
  move();
  expect(getStatus()).toEqual({ x: 0, y: 0, f: "south" });
});

test("bad inputs - no changes", ()=> {
  place(0, 0, "south");
  expect(getStatus()).toEqual({ x: 0, y: 0, f: "south" });
  place("a", "b", "south");
  expect(getStatus()).toEqual({ x: 0, y: 0, f: "south" });
})
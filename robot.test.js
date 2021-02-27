import {robot} from "./robot";

// simple assert function
function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}

function assertXYF(robot, x, y, f) {
  assert(robot.getStatus().x === x, 'x should be ' + x);
  assert(robot.getStatus().y === y, 'y should be ' + y);
  assert(robot.getStatus().f === f, 'facing should be ' + f);
}

// test robot not placed on table
console.info('test robot not placed on table, cmd should be ignored');
robot.move();
assertXYF(robot, undefined, undefined, undefined);

// test placing robot on table not inside the table
console.info('test placing robot on table but not inside the table');
robot.place(6, 5, 'north');
var status = robot.getStatus();
assertXYF(robot, undefined, undefined, undefined);

// test preventing falling from table
console.info('test preventing falling from table');
robot.place(0, 0, 'south');

robot.move();
assertXYF(robot, 0, 0, 'south');

robot.place(3, 3, 'north');
assertXYF(robot, 3, 3, 'north');

robot.move();
var status = robot.getStatus();
assertXYF(robot, 3, 4, 'north');

// example a
robot.move();
assertXYF(robot, 0, 1, 'north')
// example b
console.info('test left');
robot.left();
assertXYF(robot, 0, 0, 'west');
// example c
robot.move();
robot.move();
robot.left();
robot.move();
assertXYF(robot, 3, 3, 'north');
// keep moving
robot.move();
robot.move();
assertXYF(robot, 3, 5, 'north');

console.info('test left');
robot.left();
assertXYF(robot, 3, 5, 'west');

robot.move();
assertXYF(robot, 2, 5, 'west');

robot.right();
console.info('test right')
assertXYF(robot, 2, 5, 'north');

robot.right();
console.info('test right agin')
assertXYF(robot, 2, 5, 'east');

console.info('all passed!')

// need to copy robot.js code here, vallnala js in IIFE can not import and export, private scope otherwise override by other variable

// IIFE to create private scope
var robot = (function () {

  // private variables
  var directions = ['east', 'south', 'west', 'north'];
  var tableDimension = [5, 5];

  // robot currentStatus stores x, y and facing direction
  var currentStatus = {};  //  e.g. {x: 2, y:3, f: 'east'}


  // check if number is number
  var isInt = function (num) {
    return num === parseInt(num, 10);
  };

  var isWithinTable = function (x, y) {
    return x <= tableDimension[0] && x >= 0 && y <= tableDimension[1] && y >= 0;
  };

  var isValidDirection = function (direction) {
    return direction && directions.indexOf(direction.toLowerCase()) > -1;
  };

  var setCurrentStatus = function (x, y, f) {
    currentStatus.x = x;
    currentStatus.y = y;
    currentStatus.f = f.toLowerCase();
  };

  var isPlaced = function () {
    return (currentStatus.x || currentStatus.x === 0) && (currentStatus.y || currentStatus.y === 0) && currentStatus.f;
  };

  var rotate = function (num) {
    if (isPlaced()) {
      var currentIndex = directions.indexOf(currentStatus.f);
      var directionsLength = directions.length; // 4
      // ['east', 'south', 'west', 'north']
      // turn left : index - 1, turn right: index + 1
      var newDirectionIndex = (currentIndex + directionsLength + num) % directionsLength; // prevent negative index
      // update current status
      setCurrentStatus(currentStatus.x, currentStatus.y, directions[newDirectionIndex]);
    }
  }


  // public functions

  var report = function () {
    // for simplicity
    if (isPlaced()) {
      console.log (currentStatus.x + ', ' + currentStatus.y + ', ' + currentStatus.f);
    } else {
      console.info('Please place the robot on the table first');
    }

  };


  var place = function(x, y, f) {
    // validate all data
    if(isInt(x) && isInt(y) && isValidDirection(f) && isWithinTable(x, y)) {
      setCurrentStatus(x, y, f);

    } else {
      // for better User experience report error as well
      console.info('Cmd has been ignored, please make sure place the robot on table with correct facing');
    }
  };

  var move = function () {
    if (isPlaced()) {
      var newStatus =  JSON.parse(JSON.stringify(currentStatus)); // es6 Object.assign({}, currentStatus);
      switch (currentStatus.f) {
        case 'east':
          newStatus.x = newStatus.x + 1;
          break;
        case 'south':
          newStatus.y = newStatus.y - 1;
          break;
        case 'west':
          newStatus.x = newStatus.x - 1;
          break;
        case 'north':
          newStatus.y = newStatus.y + 1;
          break;
      }

      if (isWithinTable(newStatus.x, newStatus.y)) {
        setCurrentStatus(newStatus.x, newStatus.y, newStatus.f);
      } else {
        // report('Cmd has been ignored to prevent robot falling from table.')
      }

    }
  };


  var left = function () {
    rotate(-1);
  };

  var right = function () {
    rotate(1);
  };


  // expose public command functions
  return {
    place: place,
    move: move,
    report: report,
    left: left,
    right: right,
    getStatus: function () {
      return JSON.parse(JSON.stringify(currentStatus))
    }
  };
})();


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




const {place,
  move,
  report,
  left,
  right} = require('./robot');

  


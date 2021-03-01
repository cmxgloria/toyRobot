const readline = require("readline");
const { place, move, report, left, right } = require("./robot");

const rd = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rd.setPrompt("Please type in command line by line > ");
rd.prompt(true);

rd.on("line", function (line) {
  if (!line) return;

  let input = line.toLowerCase().trim();
  let l = input.indexOf(" ", 0);
  let command = l === -1 ? input : input.substr(0, l);

  if (input === "exit") {
    rd.close();
  }

  if (command === "place") {
    const str = input.substring(l, input.length).trim();
    const params = str.split(",");
    if (params.length != 3) {
      console.error("please input correct command!");
    }
    const x = parseInt(params[0], 10);
    const y = parseInt(params[1], 10);
    place(x, y, params[2]);
  }

  if (command === "left") {
    left();
  }

  if (command === "right") {
    right();
  }

  if (command === "move") {
    move();
  }

  if (command === "report") {
    report();
  }
}).on("close", function () {
  console.log("Bye!");
  process.exit(0);
});

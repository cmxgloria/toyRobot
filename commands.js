var readline = require('readline');
const {place,
  move,
  report,
  left,
  right} = require('./robot');
    
var rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rd.setPrompt("Please type in command line by line, or 'exit' to exit > ");
rd.prompt(true);

rd.on('line', function(line) {
    if (!line) return;
    
    var input = line.toLowerCase().trim();
    var leng = input.indexOf(' ', 0);
    var command = leng === -1 ? input : input.substr(0, leng);
    
    if (input === 'exit') { 
        rd.close();
    }
    
    if (command === "place"){
       const str = input.substring(leng, input.length).trim();
      const params = str.split(',')
      if (params.length !=3) {
        console.error('please input correct command!')
      }
      console.log(str, params)
      const x = parseInt(params[0],10);
      const y = parseInt(params[1],10);
      console.log(x, y, params[2])
      place(x, y, params[2])
    }
    
    if (command === "left"){
        left();
        //console.log(JSON.stringify(toy));
    }
    
    if (command === "right"){
        right();
        //console.log(JSON.stringify(toy));
    }
    
     if (command === "move"){
        move();
        //console.log(JSON.stringify(toy));
    }
    
     if (command === "report"){
        report()
    }
})
.on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
// Globals - No window !!!!!!!

// __dirname - path to current directory
// __filename - file name
//require  - function to use modules ( Common Js )
// module - info about current module ( file )
// process - info about the environment where the program is being executed

//Modules - can be used to access research and functions from already developed files /
// make our own modules to shorten our files and increase readability since every file is a
//module in CommonJS

//Remember this : When we import a module we invoke it , This is not unique this also happens in vanilla JavaScript and
// also in ES6 Modules

//Example custom - created modules
const {personName, personAge, personSchool, gamesPlayed, items } = require('./variables.js')

function sayHello(n){
    console.log(`Hello, ${n}`)
}

sayHello(personName);

console.log(items);
console.log(personSchool);
console.log(personAge);
console.log(gamesPlayed);

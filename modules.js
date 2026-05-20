// Globals - No window !!!!!!!

// __dirname - path to current directory
// __filename - file name
//require  - function to use modules ( Common Js )
// module - info about current module ( file )
// process - info about the environment where the program is being executed

//Modules - can be used to access research and functions from already developed files /
// make our own modules to shorten our files and increase readability since every file is a
//module in CommonJS

const sayHello = (name) => {
    console.log(`Hello There ${name}`);
}

sayHello('Sarthak');
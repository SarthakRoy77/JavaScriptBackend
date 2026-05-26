// NPM - Node Package Manager. Few of the important commands of the Node Package Manager are :-
// npm -- global command, comes with node
//local dependency - use it in this particular project
// npm i <packageName>

//global dependency - use it in any project
// npm install -g <packageName>

//package.json - manifest file its stores important things about the project/package
//There are two methods to this - the manual approach, the commands approach
// npm init (step by step, press enter to skip)
// npm init -y ( everything default)

//Importance of package.json
//Package.json is very important if it is a public project because you cannot push big node modules
// as there is a limit to it in GitHub, but if we have a package.json we only need to run npm install, and it
// will automatically install all the dependencies, and you will be ready to execute the code .

//Nodemon is a module that watches paths and actively changes the outputs rather than waiting for re- execution

console.log("Hello World!");
console.log("I printed this just right now");

//The scripts option in package.json enable us to create scripts that execute some lines of commands that can be used
// for testing / logging outputs etc.
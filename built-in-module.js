//Built - In Modules - Node has some modules that very smart people created and are included with node. These modules are known as
// built in modules . There are many built - in modules in Node.js. The basic and important built in modules which will be covered in
//this file are OS, HTTPS, FS and PATH

// OS MODULE
const os = require('os');

//Finding our user info
const user = os.userInfo();
console.log(user);
console.log(`Hello How can I help you ${user.username}`);

//Finding out the system uptime
console.log(`The system uptime is ${(os.uptime())/60} minutes`);

//Creating an OS Object
const currentOS = {
    name: os.type(),
    release : os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);

//PATH MODULE

const path = require('path');

console.log(path.sep); // Will print the URL separator , which is different for different platforms
console.log(path.join(__dirname, '/Hello/')); // It will print the URL with the arguments by cleaning it and using its separator
console.log(path.basename(__dirname))

const absolute = path.resolve(__dirname,__filename , '/variables.js//');
console.log(absolute);

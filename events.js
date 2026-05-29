// Event Loop is what allows Node.js to perform non-blocking I/O operations
// despite the fact that JavaScript is single-threaded - by offloading operations to the system kernel
// whenever possible

// An example of event loop

const {readFile} = require("fs");

console.log("Reading the file.. First Task");
readFile('fileSystemContent/first.text', "utf8", (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(`The output of the first task ... The text found is '${result}'`);
})
console.log("Starting the next task .. Second Task ");
console.log("Completed the second task")

// Another example of event loop - This happens because setTimeout is an asynchronous function that gets offloaded.

console.log("First");
setTimeout(() => {
    console.log("Second (This one takes time)") // This only happens when the call stack is empty until that it is put into a queue
}, 0);
console.log("Third");

//Events - is also used heavily in Node.js and this style of programming where we listen for events, register functions and execute them
// is known as Event - driven - programming

const EventEmitter = require('events');
const customEmitter = new EventEmitter();

customEmitter.on('response', (name, id)=> {
    console.log(`Response was received for user ${name} with id ${id}`);
})
customEmitter.emit('response', 'john', 34) // With this code, we are saying to the program that we have recorded a response event ,
// and as per the code the event 'response' was recorded and the function is executed

// The order in emitting a response and listening for a response matters, first we need to initialize a EventEmitter to listen
// for the event and then emit the response.

// Event Emitter - HTTP Example

const http = require('http');

//The server is an associated class with the EventEmitter class

const server = http.createServer()
server.on('request', (req, res) => {
    console.log("Received event..");
    console.log("Responding");
    res.write("Welcome to the Server..");
    res.end(`You are currently at the Homepage`);
    console.log("Responded")
})

server.listen(5000, ()=> {
    console.log("The server is listening on port : 5000.. ");
});



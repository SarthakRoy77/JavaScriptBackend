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
    console.log("Second (This one takes time)")
}, 0);
console.log("Third");


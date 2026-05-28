//Async patterns - Blocking code
// We should always code asynchronously so that it does not block code and rather gets
// offloaded
const https = require("https");

const server = https.createServer((request, response) => {
    if(request.url === "/") {
        response.end("Home Page");
    }
    else if(request.url === "/login") {
        //Synchronous blocking code
        for (let i = 0; i <1000; i++){
            for (let j = 0; j < 1000; j++){
                console.log(`${i} - ${j}`);
            }
        }
        response.end("Login Page");
    }
    else {
        response.end("Page not found");
    }
})

server.listen(5000, () => {
    console.log("Server is listening on port 5000...")
});

// Async patterns - Setup

const {readFile} = require("fs");

readFile("fileSystemContent/first.text", "utf8", (err, data) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(data);
    }
})

//This is async pattern and is non-blocking
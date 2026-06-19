//Streams are used to read and write sequentially when we have to handle live or big data. There are four types of streams :
// Readable : These streams are used to read
// Writable : These streams are used to write
// Duplex : These streams are used to do both ; read and

const {createReadStream} = require('fs');

const stream = createReadStream('fileSystemContent/big_file.txt');

stream.on('data', (result)=> {
    console.log("Received event..");
    console.log(result)
}) // The stream function when read emits the, the data/the error event and passes the result as an argument

// The fs.ReadStream class extends streams.Readable, so it will only read the result.
// In the output by default the size of a buffer will be a 64 kb, the last buffer is the remaining kb(s)
// We can control the size of buffer by highWaterMark options e.g. createReadStream('path', {highWaterMark:90000, encoding:'utf8'})

//Stream Example

const http = require('http');
const fs = require('fs');

const exampleServer = http.createServer(function (req, res) {
    const fileStream = fs.createReadStream('fileSystemContent/big_file.txt', 'utf8');
    fileStream.on('open', () => {
        fileStream.pipe(res);
    })
})

exampleServer.listen(3000);
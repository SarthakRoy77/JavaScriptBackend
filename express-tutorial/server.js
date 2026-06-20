const express = require('express');
const port = 8000
const path = require('path');

const app = express();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/about', (req, res) => {
    res.send("About Me");
})

app.listen(port, () => {console.log("Listening on port 8000")})
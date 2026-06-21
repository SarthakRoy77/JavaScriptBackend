const express = require('express');
const port = 8000
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {console.log("Listening on port 8000")})
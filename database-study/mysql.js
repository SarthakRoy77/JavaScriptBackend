const express = require('express');
const pool = require('./pool.js');

const app = express();

app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM exercise');
        res.send(rows);
    } catch (err) {
        res.send({msg : err || "Error, executing some code"});
    }

})
app.listen(8000, ()=> {
    console.log("Listening on port 8000");
});
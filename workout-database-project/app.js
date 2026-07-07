const express = require('express');
const pool = require('./pool.js')
const errorHandler = require('./middleware/errorHandler.js');
const port = 8000

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/exercise', async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const caloriesBurnt = req.body.calorieBurned;
    const tag = req.body.tag

    if (!name || typeof name !== 'string') {
        const err = new Error('Name (string) is required');
        err.status = 400;
        return next(err);
    }

    if (!description || description !== 'string') {
        const err = new Error('Description (string) is required');
        err.status = 400;
        return next(err);
    }

    if (!caloriesBurnt || isNaN(caloriesBurnt)) {
        const err = new Error('Amount of Calories Burnt (integer) is required');
        err.status = 400;
        return next(err);
    }

    if (!tag || tag !== 'string') {
        const err = new Error('A tag (string) is required');
        err.status = 400;
        return next(err);
    }

    try {
        const [result] = await pool.query(`INSERT INTO exercise(name, description, caloriesBurnt, tag) VALUES (?, ?, ?, ?)`, [name, description, caloriesBurnt, tag]);

        const newId = result.insertId;

        const [rows] = await pool.query('SELECT * FROM exercise WHERE id = ? ', [newId]);
        res.status(201).send(rows);

    } catch (err) {
        next(err);
    }

});

app.get('/api/exercise', async (req, res, next) => {
    try {
        const [rows] = await pool.query("SELECT * FROM exercise");

        if (rows.length === 0) {
            res.status(200).send([])
        }

        res.status(200).send(rows)
    } catch (err) {
        next(err);
    }
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening, on port ${port}`);
})
const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const errorHandler = require("../middleware/errorHandler.js");
const verifyToken = require('../middleware/verifyToken.js');

//Invoke middleware
router.use(verifyToken);

//Add CreateAnimal route
router.post("/addAnimal", async (req, res, next) => {
    if (req.verifiedData.role.toLowerCase() !== "admin") {
        const err = new Error("You need to be a admin to access this route");
        err.status = 400;
        return next(err);
    }

    try {
        const animalName = req.body["animalName"];
        const scientificName = req.body["scienceName"];
        const origin = req.body["origin"];

        if (!animalName) {
            const err = new Error("Please enter the name of the animal");
            err.status = 400;
            return next(err);
        }

        if (!scientificName) {
            const err = new Error("Please enter the scientific name of the animal");
            err.status = 400;
            return next(err);
        }

        if (!origin) {
            const err = new Error("Please enter the origin of the animal");
            err.status = 400;
            return next(err);
        }

        const [results] = await pool.query("INSERT INTO animals(name, scienceNamee, origin) VALUES (?,?,?)", [animalName, scientificName, origin]);
        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [results.insertId]);

        res.status(201).send({
            success: true,
            result: rows,
            message: `Animal added successfully with the id of ${results.insertId}`
        });

    } catch (err) {
        next(err);
    }
});

// Add Retrieve Animal by ID route
router.get('/getAnimal/:id', async (req, res, next) => {
    if (req.verifiedData.clear <= 2) {
        const err = new Error("Your clearance level needs to be higher than 2 to access this route");
        err.status = 400;
        return next(err);
    }
    if (!parseInt(req.params.id)) {
        const err = new Error("Please enter the id of the animal");
        err.status = 400;
        return next(err);
    }

    try {
        const id = parseInt(req.params.id);

        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [id]);

        if (!rows || rows.length === 0) {
            const err = new Error("Please enter a valid ID. There is no data associated with this ID");
            err.status = 400;
            return next(err);
        }

        res.status(201).send({
            success: true,
            result: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

//Add getALl animals route
router.get('/getAnimal', async (req, res, next) => {
    if (req.verifiedData.clear <= 2) {
        const err = new Error("Your clearance level needs to be higher than 2 to access this route");
        err.status = 403;
        return next(err);
    }

    try {
        const [rows] = await pool.query("SELECT * FROM animals");

        if (!rows || rows.length === 0) {
            const err = new Error("Please register a new Animal. There is no data");
            err.status = 400;
            return next(err);
        }

        res.status(200).send({
            success: true,
            result: rows
        });

    } catch (err) {
        next(err);
    }
});

//Add PUT route
router.put('/putAnimal/:id', async (req, res, next) => {
    if (req.verifiedData.role.toLowerCase() !== "admin") {
        const err = new Error("You need to be a admin to access this route");
        err.status = 403;
        return next(err);
    }

    if (!parseInt(req.params.id)) {
        const err = new Error("Please enter a valid id")
        err.status = 400;
        return next(err);
    }

    try {
        const name = req.body["animalName"];
        const scienceName = req.body["scienceName"];
        const origin = req.body["origin"];

        if (!name) {
            const err = new Error("Please enter the name of the animal");
            err.status = 400;
            return next(err);
        }

        if (!scienceName) {
            const err = new Error("Please enter the scientific name of the animal");
            err.status = 400;
            return next(err);
        }

        if (!origin) {
            const err = new Error("Please enter the origin of the animal");
            err.status = 400;
            return next(err);
        }

        await pool.query("UPDATE animals SET name = ?, scienceNamee = ?, origin = ? WHERE id =?", [name, scienceName, origin, parseInt(req.params.id)]);
        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [parseInt(req.params.id)]);

        res.status(200).send({
            success: true,
            result: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

//Add Delete route
router.delete('/deleteAnimal/:id', async (req, res, next) => {
    if (!req.verifiedData.clear >= 5) {
        const err = new Error("Your clearance level needs to be higher than 5 to access this route");
        err.status = 403;
        return next(err);
    }

    if (req.verifiedData.role.toLowerCase() !== "admin") {
        const err = new Error("You need to be a admin to access this route");
        err.status = 403;
        return next(err);
    }

    if (!parseInt(req.params.id)) {
        const err = new Error("Please enter a valid id");
        err.status = 400;
        return next(err);
    }

    try {
        await pool.query("DELETE FROM animals WHERE id = ?", [parseInt(req.params.id)]);
        const [rows] = await pool.query("SELECT * FROM animals");

        res.status(200).send({
            success: true,
            result: rows,
            message: `The animal with the id of ${parseInt(req.params.id)} has been deleted successfully from the database`
        })
    } catch (err) {
        next(err);
    }
})

router.use(errorHandler);

module.exports = router;

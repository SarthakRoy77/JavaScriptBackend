const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const errorHandler = require("../middleware/errorHandler.js");
const verifyToken = require('../middleware/verifyToken.js');

//Add CreateAnimal route
router.post("/addAnimal", verifyToken, async (req, res, next) => {
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
router.get('/getAnimal/:id', verifyToken, async (req, res, next) => {
    if (req.verifiedData.clear <= 2) {
        const err = new Error("You need a higher clearance level to access this route");
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

        res.status(201).send({
            success: true,
            result: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

router.use(errorHandler);

module.exports = router;

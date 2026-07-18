const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler.js");
const verifyToken = require('../middleware/verifyToken.js');

require("dotenv").config({quiet: true});

async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

// Login and Logout Routes

router.post("/login/:id", async (req, res, next) => {
    try {
        const user = await getUser(req.params.id);
        const pass = req.body.password;

        if (!user) {
            const err = new Error("User not found! Please give a valid ID");
            err.status = 404;
            return next(err);
        }

        if (!await bcrypt.compare(pass, user.password)) {
            const err = new Error("Invalid Credentials! Please check your password!");
            err.status = 403
            return next(err);
        }

        const payload = {
            username: user.username,
            role: user.role,
            dept: user.dept,
            clear: user.clear,
            password: user.password,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        });

        res.status(200).send({
            success: true,
            message: "Successfully logged in"
        })
    } catch (err) {
        next(err);
    }
});
router.post('/logout', (req, res, next) => {
    if (!req.cookies.token) {
        const err = new Error("First Login to continue to logout");
        err.status = 400;
        return next(err);
    }

    try {
        res.clearCookie("token");
        res.status(200).send({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        next(err);
    }
})

//Register Route
router.post("/register", async (req, res, next) => {
    try {
        const username = req.body.username;
        const role = req.body.role;
        const dept = req.body.dept;
        const clear = req.body.clear;
        const password = await bcrypt.hash(req.body.password, 10);

        if (!username) {
            const err = new Error("Please enter the username (string) ")
            err.status = 400;
            return next(err);
        }

        if (!role) {
            const err = new Error("Please enter the role (string) ")
            err.status = 400;
            return next(err);
        }

        if (!dept) {
            const err = new Error("Please enter the department (string) ")
            err.status = 400;
            return next(err);
        }

        if (!clear) {
            const err = new Error("Please enter the clearance level (Integer)")
            err.status = 400;
            return next(err);
        }

        if (!password) {
            const err = new Error("Please enter the password (string) ")
            err.status = 400;
            next(err);
        }

        const [result] = await pool.query("INSERT INTO users(username, role, dept, clear, password) VALUES (?,?,?,?,?)", [username, role, dept, clear, password]);
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);

        res.status(201).send({success: true, message: `Successfully registered with the id of ${rows[0].id}`});

    } catch (err) {
        next(err);
    }
});
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
})

router.use(errorHandler);
module.exports = router;
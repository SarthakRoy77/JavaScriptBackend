const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const cookies = require('cookie-parser');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'testing'
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookies());

const JWT_SECRET_KEY = "super_secret_hardcoded_key";
async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

app.post('/api/createUser', verifyToken, async (req, res) => {
    if (!req["verifiedData"]) {
        return res.status(403).send("You are not authorized to access this data, Please login correctly");
    }

    if (req["verifiedData"].role.toLowerCase() !== "admin") {
        return res.status(403).send("You are not authorized to access this data, you need to be a admin to access this data");
    }
    const userName = req.body.username;
    const role = req.body.role;
    const dept = req.body.dept;
    const clear = req.body.clear;
    const password = await bcrypt.hash(req.body.password, 10)

    if (!password || typeof password !== "string") {
        return res.status(400).send({success:false, message: "Please enter the password (string) of the user!"});
    }

    if (!userName || typeof userName !== 'string') {
        return res.status(400).send({success : false, message: "Please enter the name (string) of the user!"});
    }

    if (!role || typeof role !== 'string') {
        return res.status(400).send({success : false, message: "Please enter the role (string) of the user!"});
    }

    if (!dept || typeof dept !== 'string') {
        return res.status(400).send({success : false, message: "Please enter the department (string) of the user!"});
    }

    if (!clear || isNaN(clear)) {
        return res.status(400).send({success : false, message: "Please enter the clearance (integer) of the user!"});
    }

    await pool.query("INSERT INTO users(username, role, dept, clear, password) VALUES (?,?,?,?, ?)", [userName, role, dept, clear, password]);
    const [rows] = await pool.query("SELECT * FROM users");

    res.status(200).send(rows);
})
app.post('/api/login/:id', async (req, res) => {
    try {
        const user = await getUser(parseInt(req.params.id));
        const password = req.body.password;

        if (!user) {
            return res.status(404).send("The ID you have given is invalid please try again")
        }
        const payload = {
            user: user.username,
            role: user.role,
            dept: user["dept"],
            clear: user["clear"],
            password: password
        };

        const token = jwt.sign(payload, JWT_SECRET_KEY);

        if (!bcrypt.compare(password, user.password)) {
            return res.status(403).send({success:false, message: "Please enter the correct password for the id given!"});
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        });

        res.send({
            success: true,
            message: "Token has been successfully created and stored in cookies"
        });
    } catch (error) {
        res.status(400).send({success: false, message: error.message});
    }
});

app.get('/api/protected', verifyToken, (req, res) => {
    try {
        if (req["verifiedData"].role.toLowerCase() !== "admin") {
            res.status(403).send({message: "Sorry! You need to be a administrator to access this route"});
        } else {
            res.json({
                access: "Granted",
                secretMessage: "This data is heavily guarded!",
                tokenData: req["verifiedData"],
                secretData: "Haha! There is nothing secret! Haha!"
            })
        }
    }catch(error) {
        return res.status(500).send({success: false, message: error.message});
    }
});

app.get('/api/getData', verifyToken, (req, res) => {
    try {
        if (req["verifiedData"].clear <= 3) {
            return res.status(403).send({success: false, message: "Authorization failed! Your clearance level is below 3"});
        }

        res.status(200).send({
            success: true,
            data: req["verifiedData"],
            message: "You have been successfully Authorized and given the data"
        })
    } catch (error) {
        return res.status(500).send({success: false, message: error.message});
    }
});

app.post('/api/logout', (req, res) => {
    if (!req.cookies.token) {
        return res.status(400).send({
            success : false,
            message: "First Login! To Log Out"
        });
    }

    res.clearCookie('token');
    res.send({
        success : true,
        message: "Successfully Logged Out"
    });
})

function verifyToken(req, res, next) {
    if (!req.cookies) {
        return res.status(400).send({success: false, message: "No cookie has been created. Please Login!"});
    }

    if (!req.cookies.token) {
        return res.status(500).send({success: false, message: "No token has been created. We are extremely Sorry!"});
    }

    req["verifiedData"] = jwt.verify(req.cookies.token, JWT_SECRET_KEY)

    if (!req["verifiedData"]) {
        return res.status(403).send({success: false, message: "The token has been tampered with!"});
    }

    return next();

}

app.listen(3000, () => {
    console.log("Server successfully running on port 3000...");
});


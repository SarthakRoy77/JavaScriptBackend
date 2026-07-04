const sqlite = require('sqlite3');
let sql;

//Connect to the database
const db = new sqlite.Database('./sqlite.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
    }
})

//Create a Table
createSQL = `CREATE TABLE burger(orderId INTEGER PRIMARY KEY , base, mainTopping, baseSauce, orderUser)`;
db.run(createSQL);
console.log("Created the table successfully");

//Drop A Table
sql = `DROP TABLE pizza`
db.run(sql);
console.log("Dropped the table successfully")

//Insert data into a table
sql = `INSERT INTO users(id, firstName, lastName, emailId, userName, password) VALUES (?, ?, ?, ?, ?, ?)`
db.run(sql, [105, "Sarthak", "Roy", "itssarthakrealme@gmail.com", "ItsSarthakRealMe", "7382674"], (err) => {
    if (err) {
        console.log(err.message);
    }
});
console.log("Successfully inserted data into the database");

//Query A data
sql = "SELECT * FROM users WHERE id = 105"
db.all(sql, [], (err, rows) => {
    if (err) {
        console.log(err.message);
    }
    else {
        rows.forEach((row) => {
            console.log(row);
        })
    }

})
console.log("Queried the Database successfully");

// UPDATE data
sql = `UPDATE users SET firstName = ? WHERE id = ?`;
db.run(sql, ["G.O.A.T", 105], (err) => {
    if (err) {
        console.log(err.message);
    }
});
console.log("Updated the Database successfully");

//DELETE data
sql = `DELETE FROM users WHERE id = ?`;
db.run(sql, [105], (err) => {
    if (err) {
        console.log(err.message);
    }
})
console.log("Deleted the database row successfully");

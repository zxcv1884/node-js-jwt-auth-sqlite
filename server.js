const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// create & connect sqlite database
const Database = require('better-sqlite3');
const db = new Database('Account.db', { verbose: console.log });

// create table
const createTable = db.prepare('CREATE TABLE IF NOT EXISTS  Users (user TEXT PRIMARY KEY NOT NULL,password TEXT)');
createTable.run();

// create default account
const stmt = db.prepare('SELECT user, password FROM Users Where user = ?');
const user = stmt.get('admin')
if(!user){
  const insert = db.prepare('INSERT INTO Users (user, password) VALUES (?, ?)');
  insert.run('admin',bcrypt.hashSync("admin", 8));
  insert.run('user',bcrypt.hashSync("user", 8));
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

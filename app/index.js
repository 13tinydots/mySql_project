// build an enquirer terminal interface for mySQL employees_db
// require the appropriate modules
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: PASSWORD,
    database: "employees_db",
  },
  console.log(`Connected to employees_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

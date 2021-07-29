// build an enquirer terminal interface for mySQL employees_db
// require the appropriate modules
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require("inquirer");
const cTable = require("console.table");

// setup middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: PASSWORD,
    database: "employees_db",
  },
  console.log(`Connected to employees_db database.`)
);

// TODO: add inquirer functionality
const questions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a new department",
      "add a new role",
      "add a new employee",
      "update an employee role",
    ],
  },

  //TODO break these questions up to the appropriate sections
  {
    type: "input",
    name: "addDepartment",
    message: "Department name:",
    default: "",
  },
  {
    type: "input",
    name: "addRole",
    message: "Role name:",
    default: "",
  },
  {
    type: "input",
    name: "addEmployee",
    message: "Employee name:",
    default: "",
  },
];
// TODO add ability to select from list of departments in the database
// type: "list",
// name: "updateEmployeeRole",
// message: "Employee name:",
// choices:

// TODO: view all departments
function viewAllDepartments() {
  db.query(
    "SELECT * FROM departments",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        cTable(rows);
      }
    }
  );
}

// TODO: view all employees
function viewAllEmployees() {
  db.query(
    "SELECT * FROM employees",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        cTable(rows);
      }
    }
  );
}


// TODO: view all roles
function viewAllRoles() {
  db.query(
    "SELECT * FROM roles",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        cTable(rows);
      }
    }
  );
}


// TODO: add a new department
function addNewDepartment() {
  prompt(questions, (answers) => {
  INSERT INTO departments (department_name) VALUES ();


// TODO: add a new employee
// TODO: add a new role
// TODO: update an employee role
// TODO: add error handling
// TODO: BONUS: update employee managers
// TODO: BONUS: view employees by manager

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

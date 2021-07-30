// build an enquirer terminal interface for mySQL employees_db
// require the appropriate modules
import express from "express";
import inquirer from "inquirer";
import mysql from "mysql2";
const PORT = process.env.PORT || 3001;
const app = express();

// setup middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Stupid121!",
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
];
// TODO break these questions up to the appropriate sections
//   {
//     type: "input",
//     name: "addDepartment",
//     message: "Department name:",
//     default: "",
//   },
//   {
//     type: "input",
//     name: "addRole",
//     message: "Role name:",
//     default: "",
//   },
//   {
//     type: "input",
//     name: "addEmployee",
//     message: "Employee name:",
//     default: "",
//   },
// ];
// TODO add ability to select from list of departments in the database
// type: "list",
// name: "updateEmployeeRole",
// message: "Employee name:",
// choices:

// TODO: view all departments
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.table(rows);
    }
  });
}

// TODO: view all employees
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.table(rows);
    }
  });
}

// TODO: view all roles
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.table(rows);
    }
  });
}

// TODO: add a new department
// function addNewDepartment() {
//   prompt(questions, (answers) => {
//   INSERT INTO departments (department_name) VALUES ();

// TODO: add a new employee
// TODO: add a new role
// TODO: update an employee role
// TODO: add error handling
// TODO: BONUS: update employee managers
// TODO: BONUS: view employees by manager

function init() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.action) {
      case "view all departments":
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      default:
        console.log("Invalid action.");
    }
  });
}

init();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

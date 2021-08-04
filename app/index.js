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

// TODO add ability to select from list of departments in the database
// type: "list",
// name: "updateEmployeeRole",
// message: "Employee name:",
// choices:

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.table(rows);
    }

    init();
  });
}


function viewAllEmployees() {
  db.query(
    "SELECT employee.id, first_name, last_name, title, salary, department.name, manager_id FROM employee JOIN role ON role_id = role.id JOIN department ON department_id = department.id",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.table(rows);
      }
    }
  );
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

// TODO: add a new department - needs write to DB and view
function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Department name:",
      },
    ])
    .then(({ addDepartment }) => {
      const queryString = `
      INSERT INTO department(name)
      VALUES (?)`;

      db.query(queryString, [addDepartment], (err, data) => {
        if (err) throw err;
        console.log(data);
      });
    });
}

// TODO: add a new employee - needs write to DB and then view

function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeName",
        message: "Employee first name:",
      },
    ])
    .then(({ addEmployeeFn }) => {
      const queryString = `
      INSERT INTO employee(first_name)
      VALUES (?)`;
    });
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeLastName",
        message: "Employee last name:",
      },
    ])
    .then(({ addEmployeeLn }) => {
      const queryString = `
      INSERT INTO employee(last_name)
      VALUES (?)`;
    });
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeTitle",
        message: "Employee title:",
      },
    ])
    .then(({ addEmployeeTitle }) => {
      const queryString = `
      INSERT INTO employee(title)
      VALUES (?)`;
    });
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeSalary",
        message: "Employee salary:",
      },
    ])
    .then(({ addEmployeeSalary }) => {
      const queryString = `
      INSERT INTO employee(salary)
      VALUES (?)`;
    });
    // TODO: needs to list available departments and then select one
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployeeDepartment",
        message: "Employee department:",
      },
    ])
    .then(({ addEmployeeDepartment }) => {
      const queryString = `
      INSERT INTO employee(department_id)
      VALUES (?)`;
    });
}
// this is just to check the entry
      // db.query(queryString, [addEmployee], (err, data) => {
      //   if (err) throw err;
      //   console.log(data);



// TODO: add a new role
// function addNewRole() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "addRole",
//         message: "Role name:",
//       },

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
      case "add a new department":
        addNewDepartment();
        break;
      case "add a new role":
        addNewRole();
        break;
      case "add a new employee":
        addNewEmployee();
        break;
      case
      default:
        console.log("Invalid action.");
    }
  });
}

init();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

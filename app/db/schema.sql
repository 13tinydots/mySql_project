
-- Build SQL database schema
-- name the database

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- establish a connection to the database
USE employees_db;

-- create needed tables for department and employee and role

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
);


DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  ON DELETE SET NULL,
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL,
);
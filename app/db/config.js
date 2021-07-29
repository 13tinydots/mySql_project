import { config } from "dotenv";

config();

export default {
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "employees_db",
};

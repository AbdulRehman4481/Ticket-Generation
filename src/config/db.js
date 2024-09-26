const { Pool } = require("pg");

const db = new Pool({
  host: "localhost",
  user: "postgres",
  database: "interview",
  port: 5000,
  password: "abdulrehman344",
});

export default db;

const { Pool } = require("pg");

const express = require("express");
const PORT = 3030;
const app = express();

app.use(express.urlencoded({ extended: false }));

//Connect Node.js and database (postgreSQL)
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "schooldb",
  user: "postgres",
  password: "xiaoling26275703",
});

//Join two tables
app.get("/joinTwoTables", async (req, res) => {
  await pool.query(
    `select empl_id, first_name, last_name, email, position_name, position_status, position_hours from staffs join positions on staffs.positions = positions.position_id`,
    (error, result) => {
      try {
        res.send(result.rows);
      } catch (error) {
        console.log("Error is catched");
      }
    }
  );
});

//Join three tables
app.get("/joinThreeTables", async (req, res) => {
  await pool.query(
    `select empl_id, first_name, last_name, email, position_name, course_name from staffs join positions on staffs.positions = positions.position_id join courses on staffs.courses = courses.course_id`,
    (error, result) => {
      try {
        res.send(result.rows);
      } catch (error) {
        console.log("Error is catched");
      }
    }
  );
});

//Join four tables
app.get("/joinFourTables", async (req, res) => {
  await pool.query(
    `select empl_id, first_name, last_name, email, position_name, course_name, school_name from staffs join positions on staffs.positions = positions.position_id join courses on staffs.courses = courses.course_id join schools on staffs.schools = schools.school_id`,
    (error, result) => {
      try {
        res.send(result.rows);
      } catch (error) {
        console.log("Error is catched");
      }
    }
  );
});

//Post brand new line of data
app.post("/", async (req, res) => {
  pool.query(
    "INSERT INTO staffs (first_name, last_name, email, positions, courses, departments, schools) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.positions,
      req.body.courses,
      req.body.departments,
      req.body.schools,
    ]
  );
  res.status(201).send("Created successfully");
});

//Show all data in the staffs table
app.get("/getStaffs", async (req, res) => {
  await pool.query(`select * from staffs`, (error, result) => {
    try {
      res.send(result.rows);
    } catch (error) {
      console.log("Error is catched");
    }
  });
});

const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log("I am running on port: ${PORT}");
  });
};
serverRun();

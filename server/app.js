const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const Student = require("./models/Student.model")
const Cohort = require("./models/Cohort.model")

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


const cohortRoutes = require('./routes/cohort.routes')
app.use('/api/cohorts', cohortRoutes)

const studentRoutes = require('./routes/student.routes')
app.use('/api/students', studentRoutes)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
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

app.post('/api/cohorts', (req, res) => {

  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
    .then(createdCohorts => res.status(201).json(createdCohorts))
    .catch(err => res.status(500).json(err))
})

app.get('/api/cohorts', (req, res) => {
  Cohort
    .find()
    .then((cohorts) => {
      res.json(cohorts)
    })
    .catch((err) => {
      res.status(500).json({ err: "failed" })
    })
})


app.get('/api/cohorts/:cohortId', (req, res) => {

  const { id: cohortId } = req.params
  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body


  Cohort

    .findById(cohortId)
    .then(cohortInfo => res.json(cohortInfo))
    .catch(err => res.status(500).json(err))
})

app.put('/api/cohorts/:cohortId', (req, res) => {

  const { id: cohortId } = req.params
  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohort

    .findByIdAndUpdate(
      cohortId,
      { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours },
      { new: true, runValidators: true }
    )
    .then(updatedCohort => res.json(updatedCohort))
    .catch(err => res.status(500).json(err))

})


app.delete('/api/cohorts/:cohortsId', (req, res) => {

  const { id: cohortId } = req.params

  Cohort

    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(202))
    .catch(err => res.status(500).json(err))
})


app.post('/api/students', (req, res) => {

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(createdStudent => res.status(201).json(createdStudent))
    .catch(err => res.status(500).json(err))
})


app.get('/api/students', (req, res) => {
  Student
    .find()
    .populate('cohort')
    .then((students) => {
      res.json(students)
    })
    .catch((err) => {
      res.status(500).json({ err: "failed" })
    })
})

app.get('/api/students/:studentId', (req, res) => {

  const { id: studentId } = req.params

  Student
    .findById(studentId)
    .populate('cohort')
    .then(studentInfo => res.json(studentInfo))
    .catch(err => res.status(500).json(err))

})

app.put('/api/students/:studentId', (req, res) => {

  const { id: studentId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Student
    .findByIdAndUpdate(
      studentId,
      { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects },
      { new: true, runValidators: true }
    )
    .then(updatedStudent => res.json(updatedStudent))
    .catch(err => res.status(500).json(err))

})

app.delete('/api/students/:studentId', (req, res) => {

  const { id: studentId } = req.params

  Student
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(202))
    .catch(err => res.status(500).json(err))
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
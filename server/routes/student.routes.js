const router = require("express").Router()
const mongoose = require("mongoose")
const Student = require("./../models/Student.model")
const Cohort = require("./../models/Cohort.model")



router.post('/', (req, res, next) => {

    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

    Student
        .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
        .then(createdStudent => res.status(201).json(createdStudent))
        .catch(err => res.status(500).json(err))
})


router.get('/', (req, res, next) => {
    Student
        .find()
        .populate('cohort')
        .then((allStudents) => { res.status(201).json(allStudents) })
        .catch((err) => {
            res.status(500).json({ err: "failed" })
        })
})

router.get('/cohort/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    Student
        .findById(cohortId)
        .populate('cohort')
        .then((students) => { res.status(200).json(students) })
        .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res, next) => {

    const { id: studentId } = req.params

    Student
        .findById(studentId)
        .populate('cohort')
        .then(studentInfo => res.json(studentInfo))
        .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res, next) => {

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

router.delete('/:id', (req, res, next) => {

    const { id: studentId } = req.params

    Student
        .findByIdAndDelete(studentId)
        .then(() => res.sendStatus(202))
        .catch(err => res.status(500).json(err))
})

module.exports = router

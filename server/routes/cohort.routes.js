const router = require("express").Router()
const mongoose = require("mongoose")
const Cohort = require("./../models/Cohort.model")


router.post('/', (req, res, next) => {

    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

    Cohort
        .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
        .then(createdCohorts => res.status(201).json(createdCohorts))
        .catch(err => next(err))
})

router.get('/', (req, res, next) => {
    Cohort
        .find()
        .then((cohorts) => {
            res.json(cohorts)
        })
        .catch((err) => next(err))
})


router.get('/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body


    Cohort

        .findById(cohortId)
        .then(cohortInfo => res.json(cohortInfo))
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

    Cohort

        .findByIdAndUpdate(
            cohortId,
            { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours },
            { new: true, runValidators: true }
        )
        .then(updatedCohort => res.json(updatedCohort))
        .catch(err => next(err))

})


router.delete('/:id', (req, res, next) => {

    const { id: cohortId } = req.params

    Cohort

        .findByIdAndDelete(cohortId)
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
})

module.exports = router
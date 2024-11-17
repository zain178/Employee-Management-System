const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Getting All
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.send(employees)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

// Creating One
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        role: req.body.role,
        department: req.body.department,
        contactInfo: req.body.contactInfo,
        joiningDate: req.body.joiningDate,
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).send(newEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Updating One
router.patch('/:id', getEmployee, async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    if (req.body.role != null) {
        res.employee.role = req.body.role
    }
    if (req.body.department != null) {
        res.employee.department = req.body.department
    }
    if (req.body.contactInfo != null) {
        res.employee.contactInfo = req.body.contactInfo
    }
    if (req.body.joiningDate != null) {
        res.employee.joiningDate = req.body.joiningDate
    }
    try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.deleteOne()
        res.json({ message: 'Deleted Employee' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id)
        if (employee === null) {
            return res.status(404).json({ message: 'Cannot find employee' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.employee = employee
    next()
}

module.exports = router;
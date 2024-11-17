const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    contactInfo: {
        email: {
            type: String,
            required: false,
        },
        mobileNumber: {
            type: Number,
            required: false,
        }
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    performanceScore: {
        type: Number,
        required: false,
    },
    leave: {
        type: Date,
        required: false,
    },
})

module.exports = mongoose.model('Employee', employeeSchema)
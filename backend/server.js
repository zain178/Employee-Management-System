require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
}
app.use(cors(corsOptions))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const EmployeeRouter = require('./routes/employees')
app.use('/employees', EmployeeRouter)

app.listen(8080, () => console.log('Server Started'))
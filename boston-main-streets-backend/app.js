const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
// controllers
const mapRouter = require('./controllers/mapRouter')
const businessRouter = require('./controllers/businessRouter')

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('<h1>Hello BPDA</h1>')
})

app.use('/map', mapRouter)
app.use('/business', businessRouter)

module.exports = app
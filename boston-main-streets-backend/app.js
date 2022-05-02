const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
// controllers
const mapRouter = require('./controllers/mapRouter')
const businessRouter = require('./controllers/businessRouter')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/', async (req, res) => {
    res.send('<h1>Hello BPDA</h1>')
})

app.get('/api', async (req, res) => {
    res.send('<h1>Which api?</h1>')
})

app.use('/api/map', mapRouter)
app.use('/api/business', businessRouter)

module.exports = app
const mapRouter = require('express').Router()


mapRouter.get('/boundary', async (req, res) => {
    const data = require('../data/City_of_Boston_Boundary.json')
    res.json(data)
})

mapRouter.get('/districts', async (req, res) => {
    const data = require('../data/Main_Street_Districts.json')
    res.json(data)
})

module.exports = mapRouter
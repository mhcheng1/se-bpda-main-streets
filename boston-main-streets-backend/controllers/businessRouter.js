const businessRouter = require('express').Router()
const nameRule = /[^a-zA-Z]+/g
const fireDb = require('../utils/config').fireDb
const { ref, set, push, child, get } = require('firebase/database')

// get all
businessRouter.get('/', async (req, res) => {
    const snapshot = await get(child(ref(fireDb), 'business'))
    if (snapshot.exists()) {
        const districtNames = Object.keys(snapshot.val())
        let data = []
        for (const name of districtNames) {
            data.push.apply(data, Object.values(snapshot.val()[`${name}`]))
        }
        res.status(200).json(data)
    } else {
        res.status(400).json({
            error: 'no data'
        })
    }
})

// get by district
businessRouter.get('/:districtName', async (req, res) => {
    const districtName = req.params.districtName
    const snapshot = await get(child(ref(fireDb), `business/${districtName}`))
    if (snapshot.exists()) {
        res.status(200).json(Object.values(snapshot.val()))
    } else {
        res.status(400).json({
            error: 'no data'
        })
    }
})

// get by id
businessRouter.get(('/:districtName/:id'), async (req, res) => {
    const districtName = req.params.districtName
    const id = req.params.id
    const snapshot = await get(child(ref(fireDb), `business/${districtName}/${id}`))
    if (snapshot.exists()) {
        res.status(200).json(snapshot.val())
    } else {
        res.status(400).json({
            error: 'no data'
        })
    }
})

// update by id
// - N11HzEKrAe_tFR2sI0d
businessRouter.put('/:districtName/:id', async (req, res) => {
    const districtName = req.params.districtName
    const id = req.params.id
    const newData = req.body
    await set(ref(fireDb, `business/${districtName}/${id}`), newData)
    res.status(200).json(newData)
})

module.exports = businessRouter
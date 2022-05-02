const spendingRouter = require('express').Router()
const fireDb = require('../utils/config').fireDb
const { ref, set, push, child, get, query, orderByChild, onValue } = require('firebase/database')

// get spending data by district
spendingRouter.get('/:district', async (req, res) => {
    const district = req.params.district
    const dataRef = await query(ref(fireDb, `spending/${district}`), orderByChild('order'))
    onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val())
        } else {
            res.status(400).json({
                error: 'no data'
            })
        }
    })
})

// post spending data by district
spendingRouter.post('/:district', async (req, res) => {
    // list of data {date, data}
    const data = req.body
    const district = req.params.district
    let order = 1
    console.log(data)
    for (let point of data) {
        const key = push(child(ref(fireDb), `spending/${district}`))
        point.order = order
        await set(ref(fireDb, `spending/${district}/${key}`), point)
        order += 1
    }
    res.status(200).end()
})

module.exports = spendingRouter
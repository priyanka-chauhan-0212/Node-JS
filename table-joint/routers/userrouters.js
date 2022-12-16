const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

// get all user record api 

router.get('/getall', async (req, res) => {

        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            res.send('Error' + err)
        }
    })

// get record by id api
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create record api
router.post('/create', async (req, res) => {
    // let { name } = req.body
    // console.log(name);

    const alien = new User({
        name: req.body.name
    })
        try {   
        const a1 = await alien.save()
        res.status(200).json(a1)
    } catch (err) {
        // res.send('Error', err)
        res.status(200).json(err)
        console.log(err);
    }

    })

module.exports = router

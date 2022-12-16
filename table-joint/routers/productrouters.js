const { response } = require('express')
const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// get all user record api 

router.get('/getall', async (req, res) => {

    try {
        const users = await Product.find().populate('createdById')
        res.json(users)
    } catch (err) {
        res.send('Error' + err)
    }
})

// get record by id api
router.get('/:id', async (req, res) => {
    try {
        const users = await Product.findById(req.params.id)
        res.json(users)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create record api
router.post('/create', async (req, res) => {
    // let { name } = req.body
    // console.log(name);

    const alien = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        createdById: req.body.createdById
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

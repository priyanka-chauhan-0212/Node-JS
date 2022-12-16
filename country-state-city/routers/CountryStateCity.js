const { ObjectID } = require('bson')
const { response } = require('express')
const express = require('express')
const City = require('../models/City')
const router = express.Router()
const country = require('../models/Country')
const state = require('../models/State')

// get all country record api 

router.get('/getall', async (req, res) => {
    console.log(req.body);
    try {
        const cName = await country.find()
        res.json(cName)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create country record api
router.post('/create', async (req, res) => {
    // let { name } = req.body
    console.log(req.body);

    const alien = new country({
        country_name: req.body.country_name
       
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

// get all state record api 
router.get('/getstate', async (req, res) => {
    console.log(req.body);
    try {
        const sName = await state.find().populate("country_id")
        res.json(sName)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create state record api
router.post('/createState', async (req, res) => {
    // let { name } = req.body
    console.log(req.body);

    const sname = new state({
        state_name: req.body.state_name,
        country_id: req.body.country_id

    })
    try {
        const a1 = await sname.save()
        res.status(200).json(a1)
    } catch (err) {
        // res.send('Error', err)
        res.status(200).json(err)
        console.log(err);
    }

})

// get all city record api 
router.get('/getcity', async (req, res) => {
    console.log(req.body);
    try {
        const cityName = await City.find().populate("state_id")
        res.json(cityName)
    } catch (err) {
        res.send('Error' + err)
    }
})

// create city record api
router.post('/createCity', async (req, res) => {
    // let { name } = req.body
    console.log(req.body);

    const cityName = new City({
        city_name: req.body.city_name,
        state_id: req.body.state_id
    })
    try {
        const a1 = await cityName.save()
        res.status(200).json(a1)
    } catch (err) {
        // res.send('Error', err)
        res.status(200).json(err)
        console.log(err);
    }

})

//delete record by id
router.delete('/:id', async (req, res) => {
    try {
        const d1 = await state.findById(req.params.id)
        d1.state_name = req.body.state_name
        const del = await d1.remove()
        res.json(del)
    } catch (err) {
        res.send('Error')
    }
})

// get allState in countryId 
router.get('/getallstate', async (req, res) => {
    console.log("COUNTRY-ID==== DTATSTSTSTST", req.body.country_id);
  
    try {
       
        const country_id = new ObjectID(req.body.country_id);
        const data = await state.find({ country_id });
  
        console.log("id",country_id);
        console.log(`-=------ DTATTATAT`, data);
        res.status(200).json(data)

    } catch (err) {
        res.send('Error' + err)
    }
})

// get allcity in stateId
router.get('/getallcity', async (req, res) => {
    console.log("id", req.body.state_id);

    try {

        const state_id = new ObjectID(req.body.state_id);
        const data = await City.find({ state_id });

        console.log("id====", state_id);
        console.log(`-=------ DTATTATAT`, data);
        res.status(200).json(data)

    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router






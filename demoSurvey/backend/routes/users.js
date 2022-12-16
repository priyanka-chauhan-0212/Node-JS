var express = require('express');
var router = express.Router();
let models = require('../models/index');

/* GET users listing. */
router.get('/', async function (req, res, next) {
	let data = '121segfseg';

	res.cookie('accessToken', data, {
		httpOnly: true,
	});
	res.status(200).json({
		data,
	});
});

module.exports = router;

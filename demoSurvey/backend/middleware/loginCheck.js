const jwt = require('jsonwebtoken');
const models = require('../models/index');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isLoggedInUser = catchAsyncErrors(async (req, res, next) => {
	//* use below code to get token from header -------------------------
	// console.log('token-----------', req.headers['authorization']);
	if (!req.headers['authorization'])
		return res.status(401).json({
			error: 1,
			success: 0,
			message: 'Please login to uee this resource.',
		});

	const authHeader = req.headers['authorization'];
	const bearerToken = authHeader.split(' ');
	const npsAccessToken = bearerToken[1];

	//--------------------------------------------------------------------

	// const { npsAccessToken } = req.cookies;

	if (
		!npsAccessToken ||
		npsAccessToken == null ||
		npsAccessToken == undefined
	) {
		return res.status(401).json({
			error: 1,
			success: 0,
			message: 'Please login to uee this resource.',
		});
	}
	console.log('token-----------', npsAccessToken);

	jwt.verify(
		npsAccessToken,
		process.env.JWT_SECRET,
		async (err, payload) => {
			if (err) {
				console.log(err);
				return res.status(401).json({
					error: 1,
					success: 0,
					message: 'Login expired! Please login again.',
				});
			}
			// console.log('token payload----------', payload);

			req.loggedInUserData = payload;
			next();
		}
	);
});

const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const models = require('../models/index');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { accessToken } = req.cookies;

	if (!accessToken) {
		return next(
			new ErrorHander('Please Login to access this resource', 401)
		);
	}

	const decodedData = jwt.verify(accessToken, process.env.JWT_SECRET);

	req.user = await models.usersnew.findOne({
		where: {
			id: decodedData.id,
		},
	});

	next();
});

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHander(
					`Role: ${req.user.role} is not allowed to access this resouce `,
					403
				)
			);
		}

		next();
	};
};

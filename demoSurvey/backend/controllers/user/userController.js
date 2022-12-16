// const models = require("../../models/index.js");
// var Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const Joi = require("joi");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const hbs = require("nodemailer-express-handlebars");
// const path = require("path");
// const nodemailer = require("nodemailer");

// const PublicGoogleSheetsParser = require("public-google-sheets-parser");

// const ErrorHander = require("../../utils/errorhander");
// const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

// exports.forgetPasswordSendEmail = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		let { email } = req.body;

// 		let userDetail = await models.usersnew.findOne({
// 			where: {
// 				email: email,
// 			},
// 		});

// 		if (userDetail) {
// 			let id = userDetail.id;
// 			const token = jwt.sign({ id }, process.env.JWT_SECRET, {
// 				expiresIn: '1h',
// 			});

// 			if (token) {
// 				var transporter = nodemailer.createTransport({
// 					secureConnection: true, // TLS requires secureConnection to be false
// 					host: process.env.MAIL_HOST,
// 					port: process.env.MAIL_PORT,
// 					auth: {
// 						user: process.env.MAIL_USERNAME,
// 						pass: process.env.MAIL_PASSWORD,
// 					},
// 				});

// 				const handlebarsOptions = {
// 					viewEngine: {
// 						extName: '.handlebars',
// 						partialsDir: path.resolve('./templates'),
// 						defaultLayout: false,
// 						helpers: {
// 							if_eq: function (a, b, opts) {
// 								if (a == b)
// 									// Or === depending on your needs
// 									return opts.fn(this);
// 								else return opts.inverse(this);
// 							},
// 						},
// 					},
// 					viewPath: path.resolve('./templates'),
// 					estName: '.handlebars',
// 				};

// 				transporter.use('compile', hbs(handlebarsOptions));

// 				let url =
// 					process.env.FRONT_END_URL + `/reset-password/${token}`;
// 				let userName = userDetail.name.toUpperCase();
// 				userName = userName.replace(
// 					/(^\w|\s\w)(\S*)/g,
// 					(_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
// 				);

// 				var mailOptions = {
// 					from: process.env.MAIL_FROM_ADDRESS, // sender address
// 					to: email, // list of receivers
// 					subject: 'Reset password', // Subject line
// 					text: 'Reset password', // plain text body
// 					template: 'forgetPasswordSendEmail',
// 					context: {
// 						userName: userName ? userName : 'User',
// 						url: url,
// 					},
// 				};

// 				transporter.sendMail(mailOptions, function (error, info) {
// 					if (error) {
// 						console.log('error sending email: ' + error);
// 						return res.status(200).json({
// 							success: 0,
// 							error,
// 							message: 'Error in sending email.',
// 						});
// 					} else {
// 						return res.status(200).json({
// 							success: 1,
// 							error: 0,
// 							message: 'Email sent successfully.',
// 							// survayData,
// 							info,
// 						});
// 					}
// 				});
// 			} else {
// 				return res.status(200).json({
// 					success: 0,
// 					error: 1,
// 					message: 'Something went wrong.',
// 				});
// 			}
// 		} else {
// 			return res.status(200).json({
// 				success: 0,
// 				error: 1,
// 				message: 'No user found with this E-mail.',
// 			});
// 		}
// 	} catch (error) {
// 		return res.status(200).json({
// 			success: 0,
// 			error: 1,
// 			message: 'Error !',
// 		});
// 	}
// });

// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		let { userId, newPassword, confirmPassword } = req.body;

// 		if (newPassword == confirmPassword) {
// 			let userDetail = await models.usersnew.findOne({
// 				where: {
// 					id: userId,
// 				},
// 			});

// 			if (userDetail) {
// 				let hashPassword = bcrypt.hashSync(newPassword, 10);
// 				let updateUser = await models.usersnew.update(
// 					{
// 						password: hashPassword,
// 					},
// 					{
// 						where: {
// 							id: userId,
// 						},
// 					}
// 				);

// 				if (updateUser == 1) {
// 					return res.status(200).json({
// 						success: 1,
// 						error: 0,
// 						data: updateUser,
// 						message: 'Password changed successfully.',
// 					});
// 				} else {
// 					return res.status(200).json({
// 						success: 0,
// 						error: 1,
// 						data: updateUser,
// 						message: 'Error in password change.',
// 					});
// 				}
// 			} else {
// 				return res.status(200).json({
// 					success: 0,
// 					error: 1,
// 					message: 'No user found',
// 				});
// 			}
// 		} else {
// 			return res.status(200).json({
// 				success: 0,
// 				error: 1,
// 				message: 'Both password must match.',
// 			});
// 		}
// 	} catch (error) {
// 		return res.status(200).json({
// 			success: 0,
// 			error: 1,
// 			message: error,
// 		});
// 	}
// });

// exports.changePassword = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		let { old_password, new_password, confirm_password } = req.body;

// 		let { userId } = req.loggedInUserData && req.loggedInUserData;

// 		if (new_password !== confirm_password) {
// 			return res.status(200).json({
// 				success: 0,
// 				error: 1,

// 				message: 'Both password does not match.',
// 			});
// 		} else {
// 			let userDetail = await models.usersnew.findOne({
// 				where: {
// 					id: userId,
// 				},
// 			});

// 			if (userDetail) {
// 				let compare = bcrypt.compareSync(
// 					old_password,
// 					userDetail.password
// 				);

// 				if (compare) {
// 					let hashPassword = bcrypt.hashSync(new_password, 10);
// 					let updateUser = await models.usersnew.update(
// 						{
// 							password: hashPassword,
// 						},
// 						{
// 							where: {
// 								id: userId,
// 							},
// 						}
// 					);

// 					return res.status(200).json({
// 						success: 1,
// 						error: 0,
// 						updateUser,
// 						message: 'Password changed successfully.',
// 					});
// 				} else {
// 					return res.status(200).json({
// 						success: 0,
// 						error: 1,
// 						message: 'Please enter correct password',
// 					});
// 				}
// 			} else {
// 				return res.status(200).json({
// 					success: 0,
// 					error: 1,
// 					message: 'No user found',
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		return res.status(200).json({
// 			success: 0,
// 			error: 1,
// 			message: error,
// 		});
// 	}
// });

// //new create user ---
// exports.createUser = catchAsyncErrors(async (req, res, next) => {
//   const { first_name, last_name, mobile_no, email, password, username } =
//     req.body;
//   const Schema = Joi.object({
//     first_name: Joi.string().min(3).required().trim(),
//     last_name: Joi.string().min(3).required().trim(),
//     username: Joi.string(),
//     email: Joi.string()
//       .email()
//       // .email({ tlds: { allow: ['com', 'net', 'in'] } })
//       .trim()
//       .lowercase()
//       .required()
//       .messages({
//         "String.email": "Please enter valid email.",
//         "String.empty": "Please enter email.",
//       }),
//     mobile_no: Joi.string()
//       .required()
//       .regex(/^([0-9\s\-\+\(\)]*)$/)
//       .length(10)
//       .trim(),
//     password: Joi.string().min(8).required().trim(),
//   });
//   let result = Schema.validate(req.body);
//   if (result.error) {
//     return res.status(400).send({ message: result.error.details });
//   } else {
//     const existingUser = await models.usersnew.findOne({
//       where: {
//         email: email,
//       },
//     });
//     if (existingUser) {
//       return res.status(200).json({
//         error: 1,
//         success: 0,
//         message: "User already exist, Please try login.",
//       });
//     } else {
//       const profile_pic =
//         req.files && req.files.profile_pic && req.files.profile_pic[0].filename;
//       const brand_logo =
//         req.files && req.files.brand_logo && req.files.brand_logo[0].filename;
//       let hashPassword = bcrypt.hashSync(password, 10);
//       let data = await models.usersnew.create({
//         role: 2,
//         first_name,
//         last_name,
//         username,
//         name: first_name + " " + last_name,
//         mobile_no,
//         email,
//         profile_pic,
//         brand_logo,
//         password: hashPassword,
//       });

//       return res.status(200).json({
//         error: 0,
//         success: 1,
//         data,
//         message: "User created successfully.",
//       });
//     }
//   }
// });

// //old create user working
// // exports.createUser = catchAsyncErrors(async (req, res, next) => {
// // 	const { first_name, last_name, mobile_no, email, password, username } =
// // 		req.body;

// // 	const Schema = Joi.object({
// // 		first_name: Joi.string().min(3).required().trim(),
// // 		last_name: Joi.string().min(3).required().trim(),
// // 		username: Joi.string(),
// // 		email: Joi.string()
// // 			.email()
// // 			// .email({ tlds: { allow: ['com', 'net', 'in'] } })
// // 			.trim()
// // 			.lowercase()
// // 			.required()
// // 			.messages({
// // 				'String.email': 'Please enter valid email.',
// // 				'String.empty': 'Please enter email.',
// // 			}),
// // 		mobile_no: Joi.string()
// // 			.required()
// // 			.regex(/^([0-9\s\-\+\(\)]*)$/)
// // 			.length(10)
// // 			.trim(),
// // 		password: Joi.string().min(8).required().trim(),
// // 	});

// // 	let result = Schema.validate(req.body);
// // 	if (result.error) {
// // 		return res.status(400).send({ message: result.error.details });
// // 	} else {
// // 		const profile_pic =
// // 			req.files &&
// // 			req.files.profile_pic &&
// // 			req.files.profile_pic[0].filename;
// // 		const brand_logo =
// // 			req.files &&
// // 			req.files.brand_logo &&
// // 			req.files.brand_logo[0].filename;

// // 		let hashPassword = bcrypt.hashSync(password, 10);

// // 		let data = await models.usersnew.create({
// // 			role: 2,
// // 			first_name,
// // 			last_name,
// // 			username,
// // 			name: first_name + ' ' + last_name,
// // 			mobile_no,
// // 			email,
// // 			profile_pic,
// // 			brand_logo,
// // 			password: hashPassword,
// // 		});

// // 		// let hashPassword =
// // 		// 	'$2a$10$Kf.gmu7.vtsM6xvtV6NI9efngpZ7sakcLdEEm2UBN4BTkItfJL4TS';

// // 		// let compare = bcrypt.compareSync('Admin@123', hashPassword);

// // 		return res.status(200).json({
// // 			error: 0,
// // 			success: 1,
// // 			data,

// // 			message: 'Sucess',
// // 		});
// // 	}
// // });

// // exports.updateUserOverviewLayout = catchAsyncErrors(async (req, res, next) => {
// // 	try {
// // 		let { userId } = req.loggedInUserData && req.loggedInUserData;

// // 		let { layoutData } = req.body;

// // 		console.log({ layoutData, userId });

// // 		let updateUser = await models.usersnew.update(
// // 			{
// // 				layoutDetail: layoutData,
// // 			},
// // 			{
// // 				where: {
// // 					id: userId,
// // 				},
// // 			}
// // 		);

// // 		return res.status(200).json({
// // 			success: 1,
// // 			error: 0,
// // 			updateUser,
// // 			message: 'Layout saved sucessfully !',
// // 		});
// // 	} catch (error) {
// // 		console.log('save error', error);
// // 		return res.status(200).json({
// // 			success: 0,
// // 			error,
// // 			message: 'Error in saving layout!!!',
// // 		});
// // 	}
// // });

// exports.updateUserSettings = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		let { userId } = req.loggedInUserData && req.loggedInUserData;

// 		let { sheetId } = req.body;

// 		console.log({ sheetId, userId });

// 		const parser = new PublicGoogleSheetsParser();

// 		await parser.parse(sheetId, 'Accounts Data').then((items) => {
// 			accountData = items;
// 		});

// 		await parser.parse(sheetId, 'State Data').then((items) => {
// 			stateData = items;
// 		});

// 		if (stateData.length && accountData.length) {
// 			let updateUser = await models.usersnew.update(
// 				{
// 					sheetID: sheetId,
// 				},
// 				{
// 					where: {
// 						id: userId,
// 					},
// 				}
// 			);

// 			let getUser = await models.usersnew.findOne({
// 				where: {
// 					id: userId,
// 				},
// 			});

// 			console.log(getUser);

// 			return res.status(200).json({
// 				success: 1,
// 				error: 0,
// 				userData: getUser,
// 				updateUser,
// 				message: 'Settings saved sucessfully !',
// 			});
// 		} else {
// 			return res.status(200).json({
// 				success: 0,
// 				error: 1,
// 				message: 'Either google sheet ID is incorrect or google 	sheet is not public !',
// 			});
// 		}
// 	} catch (error) {
// 		console.log('save error', error);
// 		return res.status(200).json({
// 			success: 0,
// 			error,
// 			message: 'Error in saving Settings!!!',
// 		});
// 	}
// });

// exports.updateUser = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		let { userId } = req.loggedInUserData && req.loggedInUserData;

// 		req.body.userId = userId;
// 		const profile_pic =
// 			req.files &&
// 			req.files.profile_pic &&
// 			req.files.profile_pic[0].filename;

// 		const brand_logo =
// 			req.files &&
// 			req.files.brand_logo &&
// 			req.files.brand_logo[0].filename;

// 		let { first_name, last_name } = req.body;

// 		let full_name = first_name + ' ' + last_name;

// 		let updateUser = await models.usersnew.update(
// 			{
// 				profile_pic: profile_pic
// 					? profile_pic
// 					: req.body.profile_pic,
// 				brand_logo: brand_logo ? brand_logo : req.body.brand_logo,
// 				name: full_name,
// 				...req.body,
// 			},
// 			{
// 				where: {
// 					id: userId,
// 				},
// 			}
// 		);

// 		let userDetail = await models.usersnew.findOne({
// 			where: {
// 				id: userId,
// 			},
// 		});

// 		return res.status(200).json({
// 			success: 1,
// 			error: 0,

// 			// data,
// 			data: userDetail,
// 			updateUser,
// 			message: 'Profile updated sucessfully !',
// 		});
// 	} catch (error) {
// 		return res.status(200).json({
// 			success: 0,
// 			error,

// 			message: 'Error in profile update!',
// 		});
// 	}
// });

// exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   const Schema = Joi.object({
//     email: Joi.string()
//       .email()
//       // .email({ tlds: { allow: ['com', 'net', 'in'] } })
//       .trim()
//       .lowercase()
//       .required()
//       .messages({
//         "String.email": "Please enter valid email.",
//         "String.empty": "Please enter email.",
//       }),

//     password: Joi.string().min(8).required().trim(),
//   });

//   let result = Schema.validate(req.body);
//   if (result.error) {
//     return res.status(400).send({ message: result.error.details });
//   } else {
//     let data = await models.usersnew.findOne({
//       where: {
//         email,
//       },
//     });

//     if (data) {
//       let enteredPassword = password;
//       let dataBasePassword = data.password;

//       console.log({ enteredPassword, dataBasePassword });

//       let compare = bcrypt.compareSync(enteredPassword, dataBasePassword);

//       if (compare) {
//         let tokenData = {
//           userId: data.id,
//         };

//         let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
//           expiresIn: process.env.JWT_EXPIRE,
//         });

//         // options for cookie
//         const options = {
//           expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//           ),
//           httpOnly: true,
//         };

//         return res.status(200).cookie("npsAccessToken", token, options).json({
//           error: 0,
//           success: 1,
//           token,
//           data,
//           message: "Login Success !",
//         });
//       } else {
//         return res.status(200).json({
//           error: 1,
//           success: 0,
//           compare,
//           message: "Please Enter Correct Password.",
//         });
//       }
//     } else {
//       return res.status(200).json({
//         error: 1,
//         success: 0,
//         message: "No user found with this e-mail.",
//       });
//     }
//   }
// });

// exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		return res
// 			.status(200)
// 			.cookie('npsAccessToken', null, {
// 				expires: new Date(Date.now()),
// 				httpOnly: true,
// 			})
// 			.json({
// 				error: 0,
// 				success: 1,
// 				message: 'Logged out successfully !',
// 			});
// 	} catch (error) {
// 		return res.status(200).json({
// 			error: 1,
// 			success: 0,
// 			compare,
// 			message: 'Logout Failed !',
// 		});
// 	}
// });

// exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
// 	let { userId } = req.loggedInUserData && req.loggedInUserData;

// 	try {
// 		if (userId) {
// 			console.log(userId);
// 			let userData = await models.usersnew.findOne({
// 				where: {
// 					id: userId,
// 				},
// 			});

// 			if (userData) {
// 				return res.status(200).json({
// 					success: 1,
// 					error: 0,
// 					data: userData,
// 					message: 'Success',
// 				});
// 			} else {
// 				return res.status(200).json({
// 					success: 0,
// 					error: 1,

// 					message: 'No user found',
// 				});
// 			}
// 		} else {
// 			return res.status(200).json({
// 				success: 0,
// 				error: 1,

// 				message: 'error',
// 			});
// 		}
// 	} catch (error) {
// 		return res.status(200).json({
// 			success: 0,
// 			error: 1,
// 			message: error,
// 		});
// 	}
// });

const db = require("../../models");

// create main Model
const User = db.user;

// main work

// 1. create user

const addUser = async (req, res) => {
  console.log(req.body);

  let info = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(info);
  res.status(200).send(user);
  // console.log(user)
};

// const addUser = async (req, res, next) => {
//   const { email, password } = req.body;

//   const Schema = Joi.object({
//     email: Joi.string()
//       .email()
//       // .email({ tlds: { allow: ['com', 'net', 'in'] } })
//       .trim()
//       .lowercase()
//       .required()
//       .messages({
//         "String.email": "Please enter valid email.",
//         "String.empty": "Please enter email.",
//       }),

//     password: Joi.string().min(8).required().trim(),
//   });

//   let result = Schema.validate(req.body);
//   if (result.error) {
//     return res.status(400).send({ message: result.error.details });
//   } else {
//     let data = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (data) {
//       let enteredPassword = password;
//       let dataBasePassword = data.password;

//       console.log({ enteredPassword, dataBasePassword });

//       let compare = bcrypt.compareSync(enteredPassword, dataBasePassword);

//       if (compare) {
//         let tokenData = {
//           userId: data.id,
//         };

//         let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
//           expiresIn: process.env.JWT_EXPIRE,
//         });
//         console.log("Token---", token);

//         // options for cookie
//         const options = {
//           expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//           ),
//           httpOnly: true,
//         };

//         return res.status(200).cookie("npsAccessToken", token, options).json({
//           error: 0,
//           success: 1,
//           token,
//           data,
//           message: "Login Success !",
//         });
//       } else {
//         return res.status(200).json({
//           error: 1,
//           success: 0,
//           compare,
//           message: "Please Enter Correct Password.",
//         });
//       }
//     } else {
//       return res.status(200).json({
//         error: 1,
//         success: 0,
//         message: "No user found with this e-mail.",
//       });
//     }
//   }
// };

module.exports = {
  addUser,
};

import React, { useEffect, useState } from 'react';
import {
	CardTitle,
	CardText,
	FormFeedback,
	Form,
	Label,
	Input,
	Button,
	Row,
	Col,
	Card,
} from 'reactstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import _get from 'lodash/get';

// import * as Actions from '../../container/redux/actions';
import FormComponent from '../../container/components/FormValidationHelper';
import Meta from '../../container/utils/meta';
import Breadcrumbs from '../../container/components/Breadcrumb';
import ImageUpload from '../../container/components/ImageUpload';
import {
	EMPTY_STRING,
	EMPTY_OBJECT,
	UNDEFINED,
} from '../../container/constants/commonConstants';
import { handleValidationForUserDetails } from './Validation';
import { Container } from './Styled';

import Loading from '../../container/assets/loading.gif';
import Spinner from '../../../src/@core/components/spinner/Fallback-spinner';

import axiosInstance from '../../container/utils/axiosInstance';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';

import * as types from '../../redux/constants/actionTypes';

import { useDispatch } from 'react-redux';
import Tabs from './Tabs';
import config from '../../container/utils/axiosConfig';
import { UPDATE_USER_API_PATH } from '../../ApiRoutes/ApiRoutes';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

const ProfileSchema = yup.object().shape({
	first_name: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.required('Please enter first name.')
		.notOneOf(
			[yup.ref(`last_name`), null],
			'Firstname and Lastname should not be same.'
		),
	last_name: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.required('Please enter last name.')
		.notOneOf(
			[yup.ref(`first_name`), null],
			'Firstname and Lastname should not be same.'
		),

	username: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.required('Please enter username.'),

	email: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.email('Please enter valid e-mail.')
		.required('Please enter e-mail'),
	mobile_no: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.required('Please enter mobile number.')
		.test(
			'len',
			'Mobile number must be 10 digits.',
			(val) => val.length == 10
		),
});

const Profile = () => {
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const defaultValues = {
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		mobile_no: '',
	};

	const {
		reset,
		control,
		setError,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues,
		resolver: yupResolver(ProfileSchema),
	});

	const [state, setState] = useState({
		loading: false,
		profileImage: EMPTY_STRING,
		photo: EMPTY_STRING,
		brandImage: EMPTY_STRING,
		brandPhoto: EMPTY_STRING,
		firstName: EMPTY_STRING,
		lastName: EMPTY_STRING,
		username: EMPTY_STRING,
		email: EMPTY_STRING,
		mobileNo: EMPTY_STRING,
		form: {
			errors: EMPTY_OBJECT,
		},
	});

	useEffect(async () => {
		setValue('first_name', user && user.first_name);
		setValue('last_name', user && user.last_name);
		setValue('username', user && user.username);
		setValue('email', user && user.email);
		setValue('mobile_no', user && user.mobile_no);

		setState({
			...state,
			profileImage: user && user.profile_pic,
			brandImage: user && user.brand_logo,
			// firstName: user && user.first_name,
			// lastName: user && user.last_name,
			// username: user && user.username,
			// email: user && user.email,
			// mobileNo: String(user && user.mobile_no),
		});
	}, [user]);

	const onDropProfile = (photo, imageUrl) => {
		console.log(imageUrl.name);
		setState({ ...state, photo, profileImage: imageUrl });
	};

	const onDropBrandLogo = (photo, imageUrl) => {
		console.log('ttttttttttttttttttttt', { photo, imageUrl });

		setState({ ...state, brandPhoto: photo, brandImage: imageUrl });
	};

	const onChangePhoneNumber = (e) => {
		const value = e.target.value;
		const numbers = /^[0-9]+$/;
		if ((!value || value.match(numbers)) && value.length <= 10) {
			setState({ ...state, mobileNo: value });
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const submitForm = (data) => {
		setState({
			...state,
			loading: true,
		});

		let { first_name, last_name, username, email, mobile_no } = data;

		const newData = new FormData();
		newData.append(
			'profile_pic',
			typeof profileImage === 'object' ? profileImage : profileImage
		);
		newData.append(
			'brand_logo',
			typeof brandImage === 'object' ? brandImage : brandImage
		);
		newData.append('first_name', first_name);
		newData.append('last_name', last_name);
		newData.append('username', username);
		newData.append('email', email);
		newData.append('mobile_no', mobile_no);
		newData.append('userId', user && user.id);

		axiosInstance
			.post(UPDATE_USER_API_PATH, newData)
			.then((res) => {
				if (res.data.success === 1) {
					toast.success(
						<SuccessToast message={res.data.message} />
					);

					dispatch({
						type: types.CURRENT_USER,
						data: res.data.data,
					});
					setState({
						...state,
						loading: false,
					});
				} else {
					toast.error(<ErrorToast message={res.data.message} />);
					setState({
						...state,
						loading: false,
					});
				}
			})
			.catch((e) => {
				setState({
					...state,
					loading: false,
				});
			});
	};

	const save = () => {
		// const { saveUserProfile } = props;
		const {
			profileImage,
			brandImage,
			form,
			firstName,
			lastName,
			username,
			email,
			mobileNo,
		} = state;
		const validation = handleValidationForUserDetails(state);
		if (!validation.formIsValid) {
			form.errors = validation.errors;
			setState({ ...state, form });
			return;
		}
		const newData = new FormData();
		newData.append(
			'profile_pic',
			typeof profileImage === 'object' ? profileImage : profileImage
		);
		newData.append(
			'brand_logo',
			typeof brandImage === 'object' ? brandImage : brandImage
		);
		newData.append('first_name', firstName);
		newData.append('last_name', lastName);
		newData.append('username', username);
		newData.append('email', email);
		newData.append('userId', user && user.id);

		setState({
			...state,
			loading: true,
		});

		console.log('save profile', newData);

		setState({
			...state,
			loading: false,
		});

		axiosInstance.post(UPDATE_USER_API_PATH, newData).then((res) => {
			if (res.data.success === 1) {
				toast.success(<SuccessToast message={res.data.message} />);

				dispatch({
					type: types.CURRENT_USER,
					data: res.data.data,
				});
			} else {
				toast.error(<ErrorToast message={res.data.message} />);
			}
		});

		// saveUserProfile(newData).then(() => {
		// 	this.setState({
		// 		loading: false,
		// 	});
		// });
	};

	const { loading, profileImage, photo, brandImage, brandPhoto } = state;
	return (
		<Container className="container">
			{/* <Breadcrumbs data={['Home', 'Profile']} /> */}
			{/* <Tabs /> */}
			<Card body>
				<div className="title">User Profile</div>
				<Row className="image-row row">
					<ImageUpload
						photo={photo}
						imageUrl={
							process.env.REACT_APP_BACKEND_API_URL +
							`${state.profileImage}`
						}
						save={onDropProfile}
					/>
				</Row>
				<div className="row-wrapper">
					<Row className="brand-logo">
						<ImageUpload
							photo={brandPhoto}
							imageUrl={
								process.env.REACT_APP_BACKEND_API_URL +
								`${state.brandImage}`
							}
							save={onDropBrandLogo}
						/>
						<div
							style={{ width: 'auto' }}
							className="brand-title"
						>
							Brand Logo
						</div>
					</Row>
					<Form
						className="auth-register-form mt-2"
						onSubmit={handleSubmit(submitForm)}
					>
						<Row>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="first_name"
									>
										First Name
									</Label>
									<Controller
										control={control}
										id="first_name"
										name="first_name"
										render={({ field }) => (
											<Input
												placeholder="john"
												invalid={
													errors.first_name &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.first_name && (
										<FormFeedback>
											{
												errors.first_name
													.message
											}
										</FormFeedback>
									)}
								</div>
							</Col>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="last_name"
									>
										Last Name
									</Label>
									<Controller
										control={control}
										id="last_name"
										name="last_name"
										render={({ field }) => (
											<Input
												placeholder="john"
												invalid={
													errors.last_name &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.last_name && (
										<FormFeedback>
											{
												errors.last_name
													.message
											}
										</FormFeedback>
									)}
								</div>
							</Col>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="username"
									>
										Username
									</Label>
									<Controller
										control={control}
										id="username"
										name="username"
										render={({ field }) => (
											<Input
												placeholder="username"
												invalid={
													errors.username &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.username && (
										<FormFeedback>
											{errors.username.message}
										</FormFeedback>
									)}
								</div>
							</Col>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="register-email"
									>
										Email
									</Label>
									<Controller
										control={control}
										id="email"
										name="email"
										render={({ field }) => (
											<Input
												placeholder="john@example.com"
												invalid={
													errors.email &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.email && (
										<FormFeedback>
											{errors.email.message}
										</FormFeedback>
									)}
								</div>
							</Col>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="mobile_no"
									>
										Mobile Number
									</Label>
									<Controller
										control={control}
										id="mobile_no"
										name="mobile_no"
										render={({ field }) => (
											<Input
												placeholder="123456789"
												type="number"
												invalid={
													errors.mobile_no &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.mobile_no && (
										<FormFeedback>
											{
												errors.mobile_no
													.message
											}
										</FormFeedback>
									)}
								</div>
							</Col>
						</Row>
						<div className="button">
							<Button
								color="primary"
								className="save-button"
								// onClick={() => !loading && save()}
							>
								{loading ? (
									<img
										src={Loading}
										style={{
											width: '25%',
											height: '100%',
										}}
										className="loading"
									/>
								) : (
									'Save'
								)}
							</Button>
						</div>
					</Form>
				</div>
			</Card>
		</Container>
	);
};

export default Profile;

// <Row>
// 			<Col>
// 				<input
// 					type="text"
// 					name="firstName"
// 					placeholder="First name"
// 					className={cx(
// 						errors.firstName && 'error'
// 					)}
// 					value={firstName}
// 					onChange={handleInputChange}
// 					errors={errors.firstName}
// 				/>
// 			</Col>
// 			<Col>
// 				<input
// 					type="text"
// 					name="lastName"
// 					placeholder="Last name"
// 					className={cx(
// 						errors.lastName && 'error'
// 					)}
// 					value={lastName}
// 					onChange={handleInputChange}
// 					errors={errors.lastName}
// 				/>
// 			</Col>
// 		</Row>
// 		<Row>
// 			<Col>
// 				<input
// 					type="text"
// 					name="username"
// 					placeholder="Username"
// 					className={cx(
// 						errors.username && 'error'
// 					)}
// 					value={username}
// 					onChange={handleInputChange}
// 					errors={errors.username}
// 				/>
// 			</Col>
// 			<Col>
// 				<input
// 					type="email"
// 					name="email"
// 					placeholder="Email"
// 					className={cx(errors.email && 'error')}
// 					value={email}
// 					onChange={handleInputChange}
// 					errors={errors.email}
// 				/>
// 			</Col>
// 		</Row>
// 		<Row>
// 			<Col className="col-6">
// 				<input
// 					type="text"
// 					name="mobileNo"
// 					placeholder="Mobile number"
// 					className={cx(
// 						errors.mobileNo && 'error'
// 					)}
// 					value={mobileNo}
// 					onChange={onChangePhoneNumber}
// 					errors={errors.mobileNo}
// 				/>
// 			</Col>
// 		</Row>
// 		<div className="button">
// 			<Button
// 				color="primary"
// 				className="save-button"
// 				onClick={() => !loading && save()}
// 			>
// 				{loading ? (
// 					<img
// 						src={Loading}
// 						style={{
// 							width: '15%',
// 							height: '100%',
// 						}}
// 						className="loading"
// 					/>
// 				) : (
// 					'Save'
// 				)}
// 			</Button>
// 		</div>

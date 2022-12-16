/* eslint-disable no-tabs */
// ** React Imports
import { Link, useHistory } from 'react-router-dom';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import {
	Row,
	Col,
	CardTitle,
	CardText,
	FormFeedback,
	Form,
	Label,
	Input,
	Button,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

import {
	ErrorToast,
	SuccessToast,
} from '../container/components/ToastComponent';
import { ROUTE_SIGN_IN } from '../router/routes';
import axiosInstance from '../container/utils/axiosInstance';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../@core/components/spinner/Fallback-spinner';
import TermsModal from './TermsModal';
import { REGISTER_API_PATH } from '../ApiRoutes/ApiRoutes';

const SignupSchema = yup.object().shape({
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
			(val) => val.length === 10
		),

	password: yup
		.string()
		.matches(/^\S*$/, 'Whitespace is not allowed')
		.test(
			'len',
			'Password must be  minimum 8 character.',
			(val) => val.length >= 8
		)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
		)
		.required('Please enter password.'),
});

const RegisterCover = () => {
	// ** Hooks
	const { skin } = useSkin();
	const history = useHistory();

	const [termsCheckbox, setTermsCheckbox] = useState(false);

	const [state, setState] = useState({
		loading: false,
		isOpen: false,
	});

	const [showTerms, setShowTerms] = useState(false);

	const defaultValues = {
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		mobile_no: '',
		password: '',
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
		resolver: yupResolver(SignupSchema),
	});

	const illustration =
			skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	const submitForm = (data) => {
		let createUserData = {
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			email: data.email,
			mobile_no: data.mobile_no,
			password: data.password,
		};

		setState({ ...state, loading: true });

		axiosInstance
			.post(REGISTER_API_PATH, createUserData)
			.then((response) => {
				if (response.data.success === 1) {
					toast.success(
						<SuccessToast message={response.data.message} />
					);

					history.push(ROUTE_SIGN_IN);

					setState({ ...state, loading: false });
				} else {
					toast.error(
						<ErrorToast message={response.data.message} />
					);
					setState({ ...state, loading: false });
				}
			})
			.catch((e) => setState({ ...state, loading: false }));
	};

	if (state.loading) {
		return <Spinner />;
	}

	return (
		<div className="auth-wrapper auth-cover">
			<Row className="auth-inner m-0">
				<TermsModal
					setShowTerms={setShowTerms}
					showTerms={showTerms}
				/>
				{/* <Link
					className="brand-logo"
					to="/"
					onClick={(e) => e.preventDefault()}
				>
					<svg viewBox="0 0 139 95" version="1.1" height="28">
						<defs>
							<linearGradient
								x1="100%"
								y1="10.5120544%"
								x2="50%"
								y2="89.4879456%"
								id="linearGradient-1"
							>
								<stop
									stopColor="#000000"
									offset="0%"
								></stop>
								<stop
									stopColor="#FFFFFF"
									offset="100%"
								></stop>
							</linearGradient>
							<linearGradient
								x1="64.0437835%"
								y1="46.3276743%"
								x2="37.373316%"
								y2="100%"
								id="linearGradient-2"
							>
								<stop
									stopColor="#EEEEEE"
									stopOpacity="0"
									offset="0%"
								></stop>
								<stop
									stopColor="#FFFFFF"
									offset="100%"
								></stop>
							</linearGradient>
						</defs>
						<g
							id="Page-1"
							stroke="none"
							strokeWidth="1"
							fill="none"
							fillRule="evenodd"
						>
							<g
								id="Artboard"
								transform="translate(-400.000000, -178.000000)"
							>
								<g
									id="Group"
									transform="translate(400.000000, 178.000000)"
								>
									<path
										d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
										id="Path"
										className="text-primary"
										style={{
											fill: 'currentColor',
										}}
									></path>
									<path
										d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
										id="Path"
										fill="url(#linearGradient-1)"
										opacity="0.2"
									></path>
									<polygon
										id="Path-2"
										fill="#000000"
										opacity="0.049999997"
										points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
									></polygon>
									<polygon
										id="Path-2"
										fill="#000000"
										opacity="0.099999994"
										points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
									></polygon>
									<polygon
										id="Path-3"
										fill="url(#linearGradient-2)"
										opacity="0.099999994"
										points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
									></polygon>
								</g>
							</g>
						</g>
					</svg>
					<h2 className="brand-text text-primary ms-1">Vuexy</h2>
				</Link> */}
				<Col
					className="d-none d-lg-flex align-items-center p-5"
					lg="8"
					sm="12"
				>
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img
							className="img-fluid"
							src={source}
							alt="Login Cover"
						/>
					</div>
				</Col>
				<Col
					className="d-flex align-items-center auth-bg px-2 p-lg-5"
					lg="4"
					sm="12"
				>
					<Col
						className="px-xl-2 mx-auto"
						xs="12"
						sm="8"
						md="6"
						lg="12"
					>
						<CardTitle tag="h2" className="fw-bold mb-1">
							Adventure starts here 🚀
						</CardTitle>
						{/* <CardText className="mb-2">
							Make your app management easy and fun!
						</CardText> */}
						<Form
							className="auth-register-form mt-2"
							onSubmit={handleSubmit(submitForm)}
						>
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
										{errors.first_name.message}
									</FormFeedback>
								)}
							</div>
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
										{errors.last_name.message}
									</FormFeedback>
								)}
							</div>
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
												errors.email && true
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
										{errors.mobile_no.message}
									</FormFeedback>
								)}
							</div>
							<div className="mb-1">
								<div className="d-flex justify-content-between">
									<Label
										className="form-label"
										for="login-password"
									>
										Password
									</Label>
								</div>

								<Controller
									control={control}
									id="password"
									name="password"
									render={({ field }) => (
										<InputPasswordToggle
											className="input-group-merge"
											placeholder="Password"
											invalid={
												errors.password &&
												true
											}
											{...field}
										/>
									)}
								/>
								{errors && errors.password && (
									<FormFeedback>
										{errors.password.message}
									</FormFeedback>
								)}
							</div>

							<div className="form-check mb-1">
								<Input
									type="checkbox"
									id="terms"
									checked={termsCheckbox}
									onChange={() =>
										setTermsCheckbox(
											!termsCheckbox
										)
									}
								/>
								<Label className="form-check-label">
									I agree to
									<a
										style={{ color: 'blue' }}
										className="ms-25"
										onClick={() =>
											setShowTerms(true)
										}
									>
										privacy policy & terms
									</a>
								</Label>
							</div>

							<Button
								color="primary"
								block
								disabled={termsCheckbox ? false : true}
							>
								Sign up
							</Button>
						</Form>
						<p className="text-center mt-2">
							<span className="me-25">
								Already have an account?
							</span>
							<Link to={ROUTE_SIGN_IN}>
								<span>Sign in instead</span>
							</Link>
						</p>
						{/* <div className="divider my-2">
							<div className="divider-text">or</div>
						</div>
						<div className="auth-footer-btn d-flex justify-content-center">
							<Button color="facebook">
								<Facebook size={14} />
							</Button>
							<Button color="twitter">
								<Twitter size={14} />
							</Button>
							<Button color="google">
								<Mail size={14} />
							</Button>
							<Button className="me-0" color="github">
								<GitHub size={14} />
							</Button>
						</div> */}
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default RegisterCover;

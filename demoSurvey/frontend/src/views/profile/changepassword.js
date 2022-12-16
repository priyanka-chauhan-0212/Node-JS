// ** React Imports
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// ** Icons Imports
import { ChevronLeft } from 'react-feather';

// ** Custom Components
import InputPassword from '@components/input-password-toggle';

// ** Reactstrap Imports
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Form,
	Label,
	Button,
	Row,
	Col,
	FormFeedback,
	Input,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import './passwordCss.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';
import { toast } from 'react-toastify';
import config from '../../container/utils/axiosConfig';
import axiosInstance from '../../container/utils/axiosInstance';
import { CHANGE_PASSWORD_API_PATH } from '../../ApiRoutes/ApiRoutes';

const ResetPasswordBasic = () => {
	const changePasswordSchema = yup.object().shape({
		oldPassword: yup.string().required('Please enter old password'),
		NewPassword: yup
			.string()
			.required('Please enter new password')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),

		// NewPassword: yup.string().required(),
		ConfirmPassword: yup
			.string()
			.required('please enter confirm password')
			.oneOf(
				[yup.ref(`NewPassword`), null],
				'New password and Confirm password must match.'
			),
	});

	const defaultValues = {
		oldPassword: '',
		NewPassword: '',
		ConfirmPassword: '',
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
		resolver: yupResolver(changePasswordSchema),
	});

	const submitForm = (data) => {
		let passwordData = {
			// userId: 1,
			old_password: data.oldPassword,
			new_password: data.NewPassword,
			confirm_password: data.ConfirmPassword,
		};

		axiosInstance
			.post(CHANGE_PASSWORD_API_PATH, passwordData)
			.then((res) => {
				if (res.data.success == 1) {
					reset();
					toast.success(
						<SuccessToast message={res.data.message} />
					);
				} else {
					return toast.error(
						<ErrorToast message={res.data.message} />
					);
				}
			});
	};
	return (
		<div className="change-password">
			<div>
				<Card className="mb-0">
					<CardBody>
						<CardTitle tag="h4" className="mb-1">
							Change Password 🔒
						</CardTitle>
						{/* <CardText className="mb-2">
							Your new password must be different from
							previously used passwords
						</CardText> */}
						<Form
							className="auth-reset-password-form mt-2"
							onSubmit={handleSubmit(submitForm)}
						>
							<div className="mb-1">
								<Label
									className="form-label"
									for="oldPassword"
								>
									Old Password
								</Label>

								<Controller
									control={control}
									id="oldPassword"
									name="oldPassword"
									render={({ field }) => (
										<InputPassword
											placeholder=""
											invalid={
												errors.oldPassword &&
												true
											}
											{...field}
										/>
									)}
								/>
								{errors && errors.oldPassword && (
									<FormFeedback>
										{errors.oldPassword.message}
									</FormFeedback>
								)}
							</div>
							<div className="mb-1">
								<Label
									className="form-label"
									for="new-password"
								>
									New Password
								</Label>
								<Controller
									control={control}
									id="NewPassword"
									name="NewPassword"
									render={({ field }) => (
										<InputPassword
											placeholder=""
											invalid={
												errors.NewPassword &&
												true
											}
											{...field}
										/>
									)}
								/>
								{errors && errors.NewPassword && (
									<FormFeedback>
										{errors.NewPassword.message}
									</FormFeedback>
								)}
							</div>
							<div className="mb-1">
								<Label
									className="form-label"
									for="confirm-password"
								>
									Confirm Password
								</Label>

								<Controller
									control={control}
									id="ConfirmPassword"
									name="ConfirmPassword"
									render={({ field }) => (
										<InputPassword
											placeholder=""
											invalid={
												errors.ConfirmPassword &&
												true
											}
											{...field}
										/>
									)}
								/>
								{errors && errors.ConfirmPassword && (
									<FormFeedback>
										{
											errors.ConfirmPassword
												.message
										}
									</FormFeedback>
								)}
							</div>
							<Button color="primary" block>
								Change Password
							</Button>
						</Form>
						<p className="text-center mt-2">
							{/* <Link to="/pages/login-basic">
								<ChevronLeft
									className="rotate-rtl me-25"
									size={14}
								/>
								<span className="align-middle">
									Back to login
								</span>
							</Link> */}
						</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ResetPasswordBasic;

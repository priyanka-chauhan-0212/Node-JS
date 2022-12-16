// ** React Imports
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// ** Icons Imports
import { ChevronLeft, HelpCircle } from 'react-feather';

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
import {
	CHANGE_PASSWORD_API_PATH,
	UPDATE_USER_SETTINGS_API_PATH,
} from '../../ApiRoutes/ApiRoutes';
import { Container } from './Styled';
import HelpModal from './HelpModal';
import { useSelector } from 'react-redux';
import Loading from '../../../src/@core/components/spinner/Fallback-spinner';

const Settings = () => {
	const user = useSelector((state) => state.user.currentUser);
	const [showHelpModal, setShowHelpModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const settingsSchema = yup.object().shape({
		sheetId: yup.string().required('Please enter google sheet ID'),
	});

	const defaultValues = {
		sheetId: user && user.sheetID ? user.sheetID : '',
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
		resolver: yupResolver(settingsSchema),
	});

	const submitForm = (data) => {
		setLoading(true);
		console.log(data);

		let saveData = {
			sheetId: data.sheetId,
		};

		axiosInstance
			.post(UPDATE_USER_SETTINGS_API_PATH, saveData)
			.then((res) => {
				if (res.data.success === 1) {
					toast.success(
						<SuccessToast message={res.data.message} />
					);
					setLoading(false);
				} else {
					toast.error(<ErrorToast message={res.data.message} />);
					setLoading(false);
				}
			})
			.catch((e) => {
				setLoading(false);
			});
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<HelpModal
				setShowHelpModal={setShowHelpModal}
				showHelpModal={showHelpModal}
			/>
			<Container className="container">
				<Card body>
					{' '}
					<Form
						className="auth-reset-password-form mt-2"
						onSubmit={handleSubmit(submitForm)}
					>
						<Row>
							<Col md={6}>
								<div className="mb-1">
									<Label
										className="form-label"
										for="sheetId"
									>
										Google Sheet ID
									</Label>

									<Controller
										control={control}
										id="sheetId"
										name="sheetId"
										render={({ field }) => (
											<InputPassword
												placeholder=""
												invalid={
													errors.sheetId &&
													true
												}
												{...field}
											/>
										)}
									/>
									{errors && errors.sheetId && (
										<FormFeedback>
											{errors.sheetId.message}
										</FormFeedback>
									)}
								</div>
							</Col>
							<Col
								md={6}
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								{/* <Card
									outline
									body
									style={{
										border: '1px solid black',
									}}
								>
									<h4
										style={{
											textAlign: 'center',
										}}
									>
										Steps To Get Google sheet ID
									</h4>
									<hr />
									<p style={{ padding: '0 20px' }}>
										[ 1 ] Make your google sheet
										public. [Click{' '}
										<a
											href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop"
											target="_blank"
										>
											Here
										</a>{' '}
										for referance.]
									</p>
									<br />
									<p style={{ padding: '0 20px' }}>
										[ 2 ] A spreadsheet ID can be
										extracted from its URL. For
										example, the spreadsheet ID in
										the URL
										https://docs.google.com/spreadsheets/d/
										<span
											style={{
												border: '2px solid red',
												borderRadius: '5px',
												padding: '3px',
												margin: '4px',
											}}
										>
											abc1234567
										</span>
										/edit#gid=0 is "abc1234567".
									</p>
								</Card> */}
								Instruction{' '}
								<HelpCircle
									onClick={() =>
										setShowHelpModal(true)
									}
									size={18}
									style={{
										marginLeft: '5px',
										cursor: 'pointer',
									}}
								/>
							</Col>
						</Row>

						<Button color="primary">Save</Button>
					</Form>
				</Card>
			</Container>
		</>
	);
};

export default Settings;

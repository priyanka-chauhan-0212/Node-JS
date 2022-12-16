import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// import { ROUTE_SIGN_OUT } from '../../../router/routes';

const Container = styled.div`
	font-size: 16px;
	display: flex;
	align-items: center;

	ul {
		margin-bottom: 0;
		padding: 0;
		padding-left: 16px;
	}
`;

const Notification = ({ message }) => (
	<div>
		{message && (
			<Container>
				<span style={{ textTransform: 'initial' }}>{message}</span>
			</Container>
		)}
	</div>
);

export default function ({ message, type }) {
	toast(<Notification message={message} />, { type });
}

export const serverToast = (error) => {
	const pushError = (message) =>
		toast(<Notification message={message} />, { type: 'error' });

	try {
		const { graphQLErrors, networkError } = error;
		const errors =
			graphQLErrors && graphQLErrors.length > 0
				? graphQLErrors
				: networkError;
		if (graphQLErrors.length > 0) {
			errors.forEach((e) => {
				// if (e.message === 'jwt expired') {
				// 	window.location.href = ROUTE_SIGN_OUT;
				// 	pushError(e.message);
				// 	return;
				// }
				pushError(e.message);
			});
		} else if (networkError.result) {
			pushError(networkError.result);
		}
	} catch {
		if (error.message) {
			pushError(error.message);
		} else {
			pushError('An error occurred');
		}
	}
};

export const formToast = (errors) => {
	Object.keys(errors).forEach((key) => {
		toast(<Notification message={errors[key]} />, { type: 'error' });
	});
};

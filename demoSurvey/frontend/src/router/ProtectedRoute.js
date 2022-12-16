import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	let isAuthenticated = true;
	let loading = false;

	return (
		<Fragment>
			{loading === false && (
				<Route
					{...rest}
					render={(props) => {
						if (isAuthenticated === false) {
							return <Redirect to="/login" />;
						}
						return <Component {...props} />;
					}}
				/>
			)}
		</Fragment>
	);
};

export default ProtectedRoute;

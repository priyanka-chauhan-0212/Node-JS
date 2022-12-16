import { Fragment } from 'react';
import { Check, X, AlertTriangle, Info } from 'react-feather';
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import Avatar from '@components/avatar';
export const SuccessToast = ({ message }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar
					size="sm"
					color="success"
					icon={<Check size={12} />}
				/>
				<h6 className="text-success ms-50 mb-0">Success!</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>{message || 'Success!'}</span>
		</div>
	</Fragment>
);

export const ErrorToast = ({ message }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="danger" icon={<X size={12} />} />
				<h6 className="text-danger ms-50 mb-0">Error!</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>{message || 'Something Went Wrong.'}</span>
		</div>
	</Fragment>
);

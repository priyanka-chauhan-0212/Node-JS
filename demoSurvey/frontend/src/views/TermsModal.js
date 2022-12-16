// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const TermsModal = ({ setShowTerms, showTerms }) => {
	return (
		<Fragment>
			<Modal
				scrollable={true}
				isOpen={showTerms}
				toggle={() => setShowTerms(!showTerms)}
				className="modal-dialog-centered modal-refer-earn modal-lg"
			>
				<ModalHeader
					className="bg-transparent"
					toggle={() => setShowTerms(!showTerms)}
				></ModalHeader>
				<ModalBody className="pb-5 px-sm-0">
					<div className="px-sm-4 mx-50">
						<h1 className="text-center mb-1">
							Privacy policy & Terms
						</h1>
					</div>
					<hr />
					<p className="" style={{ padding: '20px' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore
						et dolore magna aliqua. Aliquam etiam erat velit
						scelerisque in dictum non consectetur. Sem
						fringilla ut morbi tincidunt augue interdum. Eget
						felis eget nunc lobortis. Velit laoreet id donec
						ultrices tincidunt arcu non sodales neque. Lectus
						vestibulum mattis ullamcorper velit sed
						ullamcorper morbi tincidunt. Mi bibendum neque
						egestas congue quisque egestas diam in arcu. Enim
						sit amet venenatis urna cursus. Pharetra diam sit
						amet nisl suscipit adipiscing bibendum. Neque
						sodales ut etiam sit amet nisl purus. Hac
						habitasse platea dictumst vestibulum rhoncus est
						pellentesque.
					</p>
					<p className="" style={{ padding: '20px' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore
						et dolore magna aliqua. Aliquam etiam erat velit
						scelerisque in dictum non consectetur. Sem
						fringilla ut morbi tincidunt augue interdum. Eget
						felis eget nunc lobortis. Velit laoreet id donec
						ultrices tincidunt arcu non sodales neque. Lectus
						vestibulum mattis ullamcorper velit sed
						ullamcorper morbi tincidunt. Mi bibendum neque
						egestas congue quisque egestas diam in arcu. Enim
						sit amet venenatis urna cursus. Pharetra diam sit
						amet nisl suscipit adipiscing bibendum. Neque
						sodales ut etiam sit amet nisl purus. Hac
						habitasse platea dictumst vestibulum rhoncus est
						pellentesque.
					</p>
					<p className="" style={{ padding: '20px' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore
						et dolore magna aliqua. Aliquam etiam erat velit
						scelerisque in dictum non consectetur. Sem
						fringilla ut morbi tincidunt augue interdum. Eget
						felis eget nunc lobortis. Velit laoreet id donec
						ultrices tincidunt arcu non sodales neque. Lectus
						vestibulum mattis ullamcorper velit sed
						ullamcorper morbi tincidunt. Mi bibendum neque
						egestas congue quisque egestas diam in arcu. Enim
						sit amet venenatis urna cursus. Pharetra diam sit
						amet nisl suscipit adipiscing bibendum. Neque
						sodales ut etiam sit amet nisl purus. Hac
						habitasse platea dictumst vestibulum rhoncus est
						pellentesque.
					</p>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

export default TermsModal;

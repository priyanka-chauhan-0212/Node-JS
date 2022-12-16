// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const TermsModal = ({ setShowHelpModal, showHelpModal }) => {
	return (
		<Fragment>
			<Modal
				scrollable={true}
				isOpen={showHelpModal}
				toggle={() => setShowHelpModal(!showHelpModal)}
				className="modal-dialog-centered modal-refer-earn modal-lg"
			>
				<ModalHeader
					className="bg-transparent"
					toggle={() => setShowHelpModal(!showHelpModal)}
				></ModalHeader>
				<ModalBody className="pb-5 px-sm-0">
					<h4 style={{ textAlign: 'center' }}>
						Steps To Get Google sheet ID
					</h4>
					<hr />
					<p style={{ padding: '0 20px' }}>
						[ 1 ] Make your google sheet public. [Click{' '}
						<a
							href="https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop"
							target="_blank"
						>
							Here
						</a>{' '}
						for reference.]
					</p>
					<br />
					<p style={{ padding: '0 20px' }}>
						[ 2 ] A spreadsheet ID can be extracted from its
						URL. For example, the spreadsheet ID in the URL
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

					{/* <p className="" style={{ padding: '20px' }}>
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
					</p> */}
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

export default TermsModal;

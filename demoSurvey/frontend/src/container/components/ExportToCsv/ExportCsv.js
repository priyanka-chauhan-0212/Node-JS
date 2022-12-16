import React from 'react';
import { CSVLink } from 'react-csv';

import { FileText } from 'react-feather';

const ExportReactCSV = ({ csvHeaders, csvData, fileName }) =>
	csvData && csvData.length ? (
		(console.log('inside export comp ===========', csvData),
		(
			<CSVLink
				style={{
					color: 'black',
					textDecoration: 'none',
				}}
				headers={csvHeaders}
				data={csvData}
				filename={fileName}
			>
				<FileText size={15} />
				<span className="align-middle ms-50">CSV</span>
			</CSVLink>
		))
	) : (
		<></>
	);

export default ExportReactCSV;

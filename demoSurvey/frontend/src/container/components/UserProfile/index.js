import React from 'react';
import styled from 'styled-components';

import { DEFAULT_IMAGE } from '../../constants/commonConstants';

const Image = styled.img`
	width: ${(props) => props.width || 2.4}rem;
	min-width: ${(props) => props.width || 2.4}rem;
	max-width: ${(props) => props.width || 2.4}rem;
	height: ${(props) => props.height || 2.2}rem;
	margin-left: ${(props) => props.left || 0}rem;
	margin-right: ${(props) => props.right || 0}rem;
	object-fit: cover;
	border-radius: 6px;
`;

const UserProfile = ({
	image_url,
	left,
	right,
	width,
	height,
	id,
	className,
}) => {
	return (
		<Image
			src={image_url || DEFAULT_IMAGE}
			width={width}
			height={height}
			left={left}
			right={right}
			className={className}
			id={id}
		/>
	);
};

export default UserProfile;

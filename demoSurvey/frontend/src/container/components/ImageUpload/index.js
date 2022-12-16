import React from 'react';
import ImageUpload from 'react-images-upload';
import ImageUploading from 'react-images-uploading';

import styled from 'styled-components';
import _keys from 'lodash/keys';

import Colors from '../../design/Colors';
('../../');
import UserProfile from '../../components/UserProfile';
import { fonts } from '../../design/Fonts';
import { IMAGES_TYPE, UNDEFINED } from '../../constants/commonConstants';
import getBase64 from '../../utils/getBase64';
import Toast from '../../components/Toast';

import Camera from '../../assets/Camera-enable.svg';
import { ErrorToast } from '../ToastComponent';
import { toast } from 'react-toastify';

const Container = styled.div`
	position: relative;

	.profile-image {
		margin-right: 0;
		border-radius: 50%;
		width: ${({ size }) => size || 124}px;
		min-width: ${({ size }) => size || 124}px;
		max-width: ${({ size }) => size || 124}px;
		height: ${({ size }) => size || 124}px;
		position: relative;
		object-fit: cover;
	}

	.picture {
		position: relative;
	}

	.fileUploader {
		position: absolute;
		bottom: 12px;
		right: 0px;
		width: 32px;
		height: auto;
		margin: 0;
		padding: 0;
	}

	.fileContainer,
	.fileContainer .chooseFileButton {
		margin: 0 !important;
		padding: 0 !important;
		background: ${Colors.Transparent} !important;
		border-radius: 50% !important;
		right: 10px !important;
	}

	.camera {
		border: 3px solid ${Colors.Container};
		border-radius: 50%;
	}
`;

const ImageUploadSection = ({ size, buttonText, photo, imageUrl, save }) => {
	const onDrop = (picture) => {
		// console.log('on drop log', {
		// 	size,
		// 	buttonText,
		// 	photo,
		// 	imageUrl,
		// 	save,
		// });

		console.log('logo change', picture[0]);
		if (picture[0] === UNDEFINED) {
			return toast.error(
				<ErrorToast
					message={'Image is not a supported file extension'}
				/>
			);
		}
		const file = Math.round(picture[0].size / 1024);
		if (file >= 2048) {
			return toast.error(
				<ErrorToast
					message={
						'Image too Big, please select a file less than 2mb'
					}
				/>
			);
		}

		getBase64(picture[0], (imageUrl) => save(imageUrl, picture[0]));
	};
	return (
		<Container className="picture" size={size} style={{ width: 'auto' }}>
			{photo ? (
				<img src={photo} className="profile-image" />
			) : (
				<UserProfile
					width={7}
					height={6}
					image_url={photo || imageUrl}
					font={fonts.xxBig.bold}
					className="profile-image"
				/>
			)}
			<ImageUpload
				singleImage={true}
				withIcon={false}
				withPreview={false}
				buttonText={
					buttonText || <img src={Camera} className="camera" />
				}
				onChange={onDrop}
				imgExtension={_keys(IMAGES_TYPE)}
				maxFileSize={5242880}
				withLabel={false}
				className="btn-image-profile"
				errorStyle={{ display: 'none' }}
			/>
		</Container>
	);
};

export default ImageUploadSection;

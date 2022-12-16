/* eslint-disable no-tabs */
import styled from 'styled-components';

import Colors from '../../container/design/Colors';
import { scrollbars } from '../../container/design/Styled';

export const Container = styled.div`
	margin-top: 20px;
	margin-bottom: 50px;
	max-width: 100% !important;

	.topRowBreadcumbAndSaveButton {
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;

		.saveLayoutButton {
			margin-right: 20px;
		}
	}

	.respondents-comments-title,
	.promoters-title,
	.number {
		cursor: move;
	}

	.title {
		font-size: 30px;
		font-weight: 600;
		color: #183b56;
		margin-top: 0px;
		margin-bottom: 20px;

		@media (min-width: 320px) and (max-width: 1200px) {
			font-size: 20px;
			margin-top: 0px;
			margin-bottom: 20px;
			line-height: 1.6;
		}
	}

	.card {
		background: #ffffff 0% 0% no-repeat padding-box;
		box-shadow: 10px 10px 60px #00000012;
		border: none;
		border-radius: 10px;
		height: 100%;
	}

	.word img {
		height: 100%;
		max-height: 310px;
		width: 100%;
		object-fit: cover;
	}

	.score {
		width: 50%;
		height: 85px;
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
		padding-left: 20px;
		position: relative;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: hidden;
		margin-right: 15px;

		@media (min-width: 320px) and (max-width: 500px) {
			width: 100%;
			margin-right: 0;
		}

		@media (min-width: 500px) and (max-width: 991px) {
			width: 50%;
		}
	}

	.respondents {
		width: 50%;
		height: 85px;
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
		padding-left: 20px;
		position: relative;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: hidden;

		@media (min-width: 320px) and (max-width: 500px) {
			width: 100%;
		}

		@media (min-width: 500px) and (max-width: 991px) {
			width: 50%;
		}
	}

	.promoters {
		width: 50%;
		height: 270px;
		margin-right: 15px;

		@media (min-width: 320px) and (max-width: 500px) {
			width: 100%;
			margin-right: 0;
			margin-bottom: 20px;
		}

		@media (min-width: 500px) and (max-width: 991px) {
			width: 50%;
		}
	}

	.uses-totals-pop {
		display: flex;
		justify-content: center;
	}

	.user-sm {
		width: 200px;
		height: 150px;
		position: relative;
		margin-top: -40px;
	}

	.uses-totals {
		width: 50%;
		height: 270px;

		@media (min-width: 320px) and (max-width: 500px) {
			width: 100%;
		}

		@media (min-width: 500px) and (max-width: 991px) {
			width: 50%;
		}
	}

	.score-all {
		width: 50%;

		@media (min-width: 320px) and (max-width: 991px) {
			width: 100%;
		}
	}

	.d-flex {
		display: flex;
		align-items: center;

		@media (min-width: 320px) and (max-width: 500px) {
			flex-direction: column;
			width: 100%;
		}

		@media (min-width: 500px) and (max-width: 991px) {
			width: 100%;
		}
	}

	.score-flex {
		display: flex;
		align-items: center;

		@media (min-width: 320px) and (max-width: 991px) {
			flex-direction: column;
		}
	}

	.respondents-comments {
		height: 375px;
	}

	.respondents-comments-flex {
		width: 50%;
		margin-left: 30px;

		@media (min-width: 320px) and (max-width: 991px) {
			margin-top: 20px;
			margin-left: 0;
			width: 100%;
		}
	}

	.number {
		font: 600 32px Montserrat;
		color: ${ Colors.LightDark };
		margin-bottom: 5px;
	}

	.number-text {
		font: 500 14px Montserrat;
		color: ${ Colors.DarkGrey };
	}

	.number-text1 {
		font: 500 14px Montserrat;
		color: ${ Colors.DarkGrey };
		width: 100%;
		line-height: 1.5;
	}

	.promoters-title {
		padding: 15px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font: 600 18px Montserrat;
		color: ${ Colors.LightDark };
		border-bottom: 1px solid ${ Colors.BorderHover };
	}

	.overlay1 {
		background: #ddf0ed;
		width: 108px;
		height: 100px;
		position: absolute;
		top: -35px;
		right: -20px;
		border-radius: 60%;
	}

	.overlay2 {
		background: #dee7f9;
		width: 108px;
		height: 100px;
		position: absolute;
		top: -35px;
		right: -20px;
		border-radius: 60%;
	}

	.fa-chart-bar {
		color: #72bfb2;
		font-size: 30px;
		margin-top: 60px;
		margin-left: 42px;
	}

	.fa-user-friends {
		color: #779ce6;
		font-size: 20px;
		margin-top: 60px;
		margin-left: 42px;
	}

	.pie-wrapper {
		display: flex;
		justify-content: center;

		.pie {
			width: 140px;
			height: 140px;
			margin-top: 15px;
		}
	}

	.label {
		font: 500 14px Montserrat;
		color: ${ Colors.LightDark };
		padding: 0 16px;
		margin-top: 15px;

		.col {
			margin-bottom: 10px;
		}
	}

	.label1 {
		position: absolute;
		bottom: 15px;
		font: 500 14px Montserrat;
		color: ${ Colors.LightDark };
		padding: 0 16px;
		margin-top: 24px;
		width: 109%;

		.col {
			margin-bottom: 10px;
		}
	}

	.color1 {
		display: flex;
		align-items: center;

		.fa-circle {
			color: #bce897;
			margin-right: 4px;
			font-size: 8px;
		}
	}

	.color2 {
		display: flex;
		align-items: center;

		.fa-circle {
			color: #faca00;
			margin-right: 4px;
			font-size: 8px;
		}
	}

	.color3 {
		display: flex;
		align-items: center;

		.fa-circle {
			color: #e95432;
			margin-right: 4px;
			font-size: 8px;
		}
	}

	.promoters-k {
		background-color: #bce897;
		width: 80px;
		height: 80px;
		position: absolute;
		top: 60px;
		left: 20px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: ${ Colors.Container };

		div:nth-child(1) {
			font: 500 28px Montserrat;
		}

		div:nth-child(2) {
			font: 500 11px Montserrat;
			color: #689f5c;
		}
	}

	.passive-k {
		background-color: #faca00;
		width: 60px;
		height: 60px;
		position: absolute;
		top: 70px;
		left: 120px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: ${ Colors.Container };

		div:nth-child(1) {
			font: 500 20px Montserrat;
		}

		div:nth-child(2) {
			font: 500 11px Montserrat;
			color: ${ Colors.LightDark };
			margin-top: 2px;
		}
	}

	.detractors-k {
		background-color: #e95432;
		position: absolute;
		top: 130px;
		left: 88px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: ${ Colors.Container };

		div:nth-child(1) {
			font: 500 20px Montserrat;
		}
	}

	.respondents-comments-title {
		font: 600 18px Montserrat;

		color: ${ Colors.LightDark };
		padding: 25px 36px;
		padding-top: 13px;
	}

	.wrapper {
		overflow: auto;
		padding-bottom: 0px;
		${ scrollbars };

		.wrap-flex {
			display: flex;
			align-items: center;
			padding-left: 36px;
			margin-bottom: 34px;
			cursor: pointer;
			transition: all 0.3s ease-in-out;

			:last-child {
				margin-bottom: 0;
			}
		}

		.wrap-flex.active {
			background: #ffffff 0% 0% no-repeat padding-box;
			box-shadow: 10px 10px 60px #00000012;
			padding: 10px 38px;
			border-radius: 8px;
			margin-left: -6px;
		}

		.check-box {
			width: 18px;
			min-width: 18px;
			height: 18px;
			margin-right: 20px;
		}

		.profile-flex {
			display: flex;
			align-items: center;
		}

		.name {
			font: 600 14px Montserrat;
			color: ${ Colors.LightDark };
		}

		.profile-type {
			font: 500 12px Montserrat;
			color: ${ Colors.DarkGrey };
		}
	}

	.bottom-row {
		margin-top: 20px;

		@media (min-width: 320px) and (max-width: 991px) {
			flex-direction: column;
		}

		.flex {
			display: flex;
			align-items: center;
		}

		.filter {
			display: flex;
			align-items: center;
			margin-right: 5px;
			cursor: pointer;

			.active {
				background-color: #f1f4ff;
				color: #a39fec;
				padding: 3px 8px;
				border-radius: 3px;
				border: 1px solid #a39fec;
			}

			div {
				margin-right: 10px;
			}
		}

		canvas {
			margin-top: 16px;
			padding: 0 16px;
		}
	}

	.survey {
	}

	.keywords {
		@media (min-width: 320px) and (max-width: 991px) {
			margin-top: 20px;
		}
	}

	.filter {
		font: 500 8px Montserrat;
	}

	.active-label {
		font: 500 9px Montserrat;
		color: ${ Colors.LightDark };
		text-align: center;
		margin: 15px 0;

		.fa-circle {
			color: #748bdc;
			margin-right: 4px;
			font-size: 8px;
		}
	}

	.word {
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			width: 100%;
			height: 330px;

			@media (min-width: 320px) and (max-width: 991px) {
				height: 250px;
			}
		}
	}
`;

export const Box = styled.div`
	width: 36px;
	min-width: 36px;
	height: 36px;
	margin-right: 16px;
	border-radius: 5px;
	background-color: ${ ({ color }) => color };
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
	color: ${ Colors.Container };
`;

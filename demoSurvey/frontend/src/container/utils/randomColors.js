import { setRandomColor } from './globalFunctions';

export const getRandomColors = () => {
	let colors = setRandomColor(50);

	// const colors = ['#bce897', '#faca00', '#e95432', '#779ce6'];
	const random = Math.floor(Math.random() * colors.length);
	return colors[random];
};

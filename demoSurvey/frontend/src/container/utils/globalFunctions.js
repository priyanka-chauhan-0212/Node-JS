function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	// var x = Math.floor(Math.random() * 256);
	// var y = 100 + Math.floor(Math.random() * 256);
	// var z = 50 + Math.floor(Math.random() * 256);
	// var color = 'rgb(' + x + ',' + y + ',' + z + ')';
	return color;
}

export const setRandomColor = (loopValue) => {
	let colorArray = [];
	for (var i = 0; i < loopValue; i++) {
		colorArray.push(getRandomColor());
	}
	return colorArray;
};

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const AddIconToLibrary = (IconList) => {
	library.add(fas, ...IconList);
};

export default AddIconToLibrary;

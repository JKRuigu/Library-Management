// import { combineReducers } from 'redux';

const bookReducer = (state=[], action={}) => {
	const { payload, type } = action;
	switch (type){
		case "TITLE_REGISTER":
			return payload;
		case "BOOK_REGISTER":
			return payload;
		default:
			return state;
	}
};

export default bookReducer;

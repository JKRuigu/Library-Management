// import { combineReducers } from 'redux';

const studentReducer = (state=[], action={}) => {
	const { payload, type } = action;
	switch (type){
		case "STUD_REGISTER":
			return payload;
		case "FETCH_STUDENTS":
			return payload;
		default:
			return state;
	}
};

export default studentReducer;

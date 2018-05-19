import * as types from '../consts';

const students = (state=[], action={}) =>{
  const { type, payload} = action;
  switch (type) {
    case types.STUD_FETCH:
    case types.STUD_REGISTER:
        return [
          ...state,
          ...payload
        ];
    default: return state;
  }
};

export default students;

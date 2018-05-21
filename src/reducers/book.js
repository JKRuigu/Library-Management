import * as types from '../consts';

const books = (state=[], action={}) =>{
  const { type, payload,id} = action;
  switch (type) {
    case types.BOOK_FETCH:
    case types.BOOK_REGISTER:
        return [
          ...state,
          ...payload
        ];
    default: return state;
  }
};

export default books;

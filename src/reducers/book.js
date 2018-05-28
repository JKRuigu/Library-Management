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
    case types.TITLE_REGISTER:
        return [
          ...state,
          ...payload
        ];
    case types.TITLE_REGISTER:
        return [
          ...state,
        ];
    case types.BOOK_DELETED:
      let books = [];
      state.map( book => {
        if( book._id !== id)
          books.push(book);
      });
      return books;
      case types.BOOK_ISSUE:
        return [
          ...state,
        ];
      case types.BOOK_RETURN:
        return [
          ...payload,
        ];
    default: return state;
  }
};

export default books;

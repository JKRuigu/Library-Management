import * as types from '../consts';

const books = (state=[], action={}) =>{
  const { type, payload,id} = action;
  switch (type) {
    case types.BOOK_FETCH:
      return [
        ...state,
        ...payload
      ];
    case types.BOOK_REGISTER:
      let myBooks =state.filter(x=> x._id !== payload._id)
      myBooks.push(payload)
      return myBooks;
    case types.TITLE_REGISTER:
        return [
          ...state,
          ...payload
        ];
    case types.TITLE_REGISTER:
        return [
          ...state,
          ...payload
        ];
    case types.BOOK_DELETED:
      let books = [];
      state.map( book => {
        if( book._id !== id)
          books.push(book);
      });
      return books;
      case types.BOOK_RETURN:
        return [
          ...payload,
        ];
      case types.BOOK_ISSUE:
      case types.BOOK_RETURN:        
      case types.BOWWORED_BOOK:
        let book =state.filter(x=> x._id !== payload._id)
          book.push(payload)
        return book;
    default: return state;
  }
};

export default books;

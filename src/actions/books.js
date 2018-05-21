import axios from 'axios';
import * as types from '../consts';

export const fetchBooks = () => (dispatch) => axios.get('/api/fetch/borrowing/books')
  .then( response => {
      dispatch({
       type: types.BOOK_FETCH,
       payload: response.data.books
      });
  });

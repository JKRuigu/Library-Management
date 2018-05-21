import axios from 'axios';
import * as types from '../consts';

export const fetchBooks = () => (dispatch) => axios.get('/api/fetch/borrowing/books')
  .then( response => {
      dispatch({
       type: types.BOOK_FETCH,
       payload: response.data.books
      });
});

export const addBook = (data) => ( dispatch) => axios.post('/api/book/registration',{data}).then( response => {
  dispatch({
    type: types.BOOK_REGISTER,
    payload: response.data.books
  });
});

export const addTitle = (data) => ( dispatch) => axios.post('/api/book/registration',{data}).then( response => {
  dispatch({
    type: types.TITLE_REGISTER,
    payload: response.data.tiltes
  });
});

import axios from 'axios';
import * as types from '../consts';

export const fetchBooks = () => (dispatch) => axios.get('/api/fetch/borrowing/books')
  .then( response => {
      dispatch({
       type: types.BOOK_FETCH,
       payload: response.data.books
      });
});

export const bookFetch = () => (dispatch) => axios.get('/api/fetch/borrowed/book')
  .then( response => {
      dispatch({
       type: types.BOWWORED_BOOK,
       payload: response.data.book
      });
});

export const addBook = (data) => ( dispatch) => axios.post('/api/book/registration',{data}).then( response => {
  dispatch({
    type: types.BOOK_REGISTER,
    payload: response.data.book
  });
});



export const returnBook = (data) => ( dispatch) => axios.put('/process/return/book',{data}).then( response => {
  let book = response.data.myResults.book[0];
  let user = response.data.myResults.user[0];

  dispatch({
    type: types.BOOK_RETURN,
    payload: book
  });
  dispatch({
    type: types.STUD_RETURN,
    payload: user
  });
});

export const addTitle = (data) => ( dispatch) => axios.post('/api/book/registration/titles',{data}).then( response => {
  dispatch({
    type: types.TITLE_REGISTER,
    payload: response.data.title
  });
});

export const remove = id => dispatch => axios.delete(`/api/book/${id}/delete`).then( response => {
  dispatch({
    type: types.BOOK_DELETED,
    id: response.data.data
  });
});

export const removeTitle = id => dispatch => axios.delete(`/api/title/${id}/delete`).then( response => {
  dispatch({
    type: types.BOOK_DELETED,
    id: response.data.data
  });
});

export const edit = (data) => ( dispatch) => axios.put('/api/book/edit',{data}).then( response => {
  dispatch({
    type: types.BOOK_EDIT,
    payload: response.data.data
  });
});

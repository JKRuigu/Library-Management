import axios from 'axios';


export const bookRegister = (data) => (dispatch) => axios.post('/api/book/registration', {...data}).then( response => {
  localStorage.setItem('id_token', 'false');
  dispatch({
    type: "BOOK_REGISTER",
    payload: response.data
  });
});

export const titleRegister = (data) => (dispatch) => axios.post('/api/book/registration/titles', {...data}).then( response => {
  localStorage.setItem('id_token', response.data.id);
  dispatch({
    type: "TITLE_REGISTER",
    payload: response.data
  });
});

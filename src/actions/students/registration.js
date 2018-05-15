import axios from 'axios';

export const studRegister = (data) => (dispatch) => axios.post('/api/student/registration', {...data}).then( response => {
  localStorage.setItem('id_token', response.data.id);
  dispatch({
    type: "STUD_REGISTER",
    payload: response.data
  });
});

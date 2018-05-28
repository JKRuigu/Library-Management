import axios from 'axios';
import * as types from '../consts';



export const register = (data) => ( dispatch) => axios.post('/api/student/register',{data}).then( response => {
  dispatch({
    type: types.STUD_REGISTER,
    payload: response.data.student
  });
});


export const fetch = () => (dispatch) => axios.get('/api/fetch/students')
  .then( response => {
      dispatch({
       type: types.STUD_FETCH,
       payload: response.data.students
      });
  });

export const edit = (data) => ( dispatch) => axios.put('/api/student/edit',{data}).then( response => {
  dispatch({
    type: types.STUD_EDIT,
    payload: response.data.data
  });
});

export const remove = id => dispatch => axios.delete(`/api/student/${id}/delete`).then( response => {
  dispatch({
    type: types.STUD_DELETED,
    id: response.data.data
  });
});

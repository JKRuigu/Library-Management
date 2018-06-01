import axios from 'axios';
import * as types from '../consts';

export const fetchOverdue = () => (dispatch) => axios.get('/process/fetch/overdue')
  .then( response => {
      dispatch({
       type: types.OVERDUE_FETCH,
       payload: response.data.data
      });
});

export const chargeOverdue = (data) => ( dispatch) => axios.post('/process/student/overdue/add',{data}).then( response => {
  dispatch({
    type: types.OVERDUE_ADD,
    payload: response.data.overdue
  });

  dispatch({
    type: types.STUD_RETURN,
    payload: response.data.user
  });

  dispatch({
    type: types.BOOK_RETURN,
    payload: response.data.book
  });
});

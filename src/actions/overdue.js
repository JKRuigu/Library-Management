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
  let book = response.data.chargeResults.book[0];
  let user = response.data.chargeResults.user[0];
  let overdue = response.data.chargeResults.overdue;

  dispatch({
    type: types.OVERDUE_ADD,
    payload: overdue
  });

  dispatch({
    type: types.STUD_RETURN,
    payload:user
  });

  dispatch({
    type: types.BOOK_RETURN,
    payload: book
  });
});

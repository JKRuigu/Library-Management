import axios from 'axios';
import * as types from '../consts';
const port = 8080;

export const fetchOverdue = () => (dispatch) => axios.get(`http://localhost:${port}/process/fetch/overdue`)
  .then( response => {
      dispatch({
       type: types.OVERDUE_FETCH,
       payload: response.data.data
      });
});

export const chargeOverdue = (data) => ( dispatch) => axios.post(`http://localhost:${port}/process/student/overdue/add`,{data}).then( response => {
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

export const remove = id => dispatch => axios.delete(`http://localhost:${port}/api/process/book/overdue/${id}/delete`).then( response => {
  dispatch({
    type: types.OVERDUE_DELETE,
    id: response.data.data
  });
});

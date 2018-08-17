import axios from 'axios';
import * as types from '../consts';

export const fetchTitles = () => (dispatch) => axios.get('/api/fetch/titles')
  .then( response => {
      dispatch({
       type: types.TITLES_FETCH,
       payload: response.data.titles
      });
});

export const editTitle = (data) => ( dispatch) => axios.put('/api/title/edit',{data}).then( response => {
  dispatch({
    type: types.TITLE_EDIT,
    payload: response.data.data
  });
});

// export const removeTitle = id => dispatch => axios.delete(`/api/title/${id}/delete`).then( response => {
//   dispatch({
//     type: types.TITLE_DELETED,
//     id: response.data.data
//   });
// });

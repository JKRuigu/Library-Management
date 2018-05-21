import axios from 'axios';
import * as types from '../consts';

export const fetchTitles = () => (dispatch) => axios.get('/api/fetch/titles')
  .then( response => {
      dispatch({
       type: types.TITLES_FETCH,
       payload: response.data.titles
      });
});

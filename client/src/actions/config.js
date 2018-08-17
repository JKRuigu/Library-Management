import axios from 'axios';
import * as types from '../consts';
const port = 8080;

export const fetchStream = () => (dispatch) => axios.get(`http://localhost:${port}/api/fetch/stream`)
  .then( response => {
      dispatch({
       type: types.STREAM_FETCH,
       payload: response.data.data
      });
  });

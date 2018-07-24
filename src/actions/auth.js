import axios from 'axios';
import * as types from '../consts';
const port = 8080
export const login = (data) => ( dispatch) => axios.post(`http://localhost:${port}/api/staff/login`,{data}).then( response => {
  dispatch({
    type: types.AUTH_LOGIN,
    payload: response.data.data
  });
});

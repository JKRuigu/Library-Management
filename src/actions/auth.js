import axios from 'axios';
import * as types from '../consts';

export const login = (data) => ( dispatch) => axios.post('/api/staff/login',{data}).then( response => {
  dispatch({
    type: types.AUTH_LOGIN,
    payload: response.data.data
  });
});

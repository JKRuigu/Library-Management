import * as types from '../consts';

const auth = (state=[], action={}) =>{
  const { type, payload} = action;
  switch (type) {
    case types.AUTH_LOGIN:
    case types.AUTH_LOGOUT:
        return payload
    default: return state;
  }
};

export default auth;

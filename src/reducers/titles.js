import * as types from '../consts';

const titles = (state=[], action={}) =>{
  const { type, payload} = action;
  switch (type) {
    case types.TITLES_FETCH:
        return [
          ...state,
          ...payload
        ];
    default: return state;
  }
};

export default titles;

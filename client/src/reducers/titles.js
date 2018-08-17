import * as types from '../consts';

const titles = (state=[], action={}) =>{
  const { type, payload,id} = action;
  switch (type) {
    case types.TITLES_FETCH:
        return [
          ...state,
          ...payload
        ];
    case types.TITLE_EDIT:
      let titles =state.filter(x=> x._id !== payload._id)
      titles.push(payload)
      return titles;
    default: return state;
  }
};

export default titles;

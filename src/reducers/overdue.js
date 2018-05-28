import * as types from '../consts';

const overdue = (state=[], action={}) =>{
  const { type, payload,id} = action;
  switch (type) {
    case types.OVERDUE_FETCH:
    case types.OVERDUE_ADD:
        return [
          ...state,
          ...payload
        ];
    default: return state;
  }
};

export default overdue;

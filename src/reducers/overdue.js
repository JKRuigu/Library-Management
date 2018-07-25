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
    case types.OVERDUE_DELETE:
      let overdue = [];
        state.map( item => {
          if( item._id !== id)
            overdue.push(item);
        });
      return overdue;
    default: return state;
  }
};

export default overdue;

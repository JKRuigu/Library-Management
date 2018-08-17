import * as types from '../consts';

const config = (state=[], action={}) =>{
  const { type, payload} = action;
  switch (type) {
    case types.STREAM_FETCH:
      var bookAcc = [];
      var i =0;
      payload.forEach(function (form) {
        if(form.hasOwnProperty('stream')){
            bookAcc[i] = form.stream;
            i++;
        }
      });
      return bookAcc
    default: return state;
  }
};

export default config;

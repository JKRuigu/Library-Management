import * as types from '../consts';

const students = (state=[], action={}) =>{
  const { type, payload,id} = action;
  switch (type) {
    case types.STUD_FETCH:
    case types.STUD_REGISTER:
    case types.STUD_CHARGE:
        return [
          ...state,
          ...payload
        ];
    case types.STUD_EDIT:
      let stud =state.filter(x=> x._id !== payload._id)
      stud.push(payload)
      return stud;
    case types.STUD_DELETED:
      let students = [];
        state.map( student => {
          if( student._id !== id)
            students.push(student);
        });
      return students;
    case types.STUD_BORROW:
    case types.STUD_RETURN:
      let studs =state.filter(x=> x._id !== payload._id)
      studs.push(payload)
      return studs;
    default: return state;
  }
};

export default students;

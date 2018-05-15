import { combineReducers } from 'redux';
import student from './books/book';
import book from './students/student';

export default combineReducers({ student, book });

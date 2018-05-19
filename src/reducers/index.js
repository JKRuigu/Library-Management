import { combineReducers } from 'redux';
import students from './student';
import books from './book';

export default combineReducers({ students, books });

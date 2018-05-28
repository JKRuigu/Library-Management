import { combineReducers } from 'redux';
import students from './student';
import books from './book';
import titles from './titles';
import config from './config';
import overdue from './overdue';

export default combineReducers({ students,config, books,titles,overdue });

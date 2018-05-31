import { combineReducers } from 'redux';
import students from './student';
import books from './book';
import titles from './titles';
import config from './config';
import overdue from './overdue';
import auth from './auth';

export default combineReducers({ auth,students,config, books,titles,overdue });

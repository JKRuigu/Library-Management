import { combineReducers } from 'redux';
import students from './student';
import books from './book';
import config from './config';

export default combineReducers({ students,config, books });

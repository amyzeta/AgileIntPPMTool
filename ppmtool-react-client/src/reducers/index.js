import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  task: taskReducer
});

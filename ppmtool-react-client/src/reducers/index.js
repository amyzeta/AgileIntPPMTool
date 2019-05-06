import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';
import requestReducer from './requestReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  task: taskReducer,
  request: requestReducer,
  security: securityReducer
});

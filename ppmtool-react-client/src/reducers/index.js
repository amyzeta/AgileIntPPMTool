import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';
import requestReducer from './requestReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  project: projectReducer,
  task: taskReducer,
  request: requestReducer,
  security: securityReducer
});

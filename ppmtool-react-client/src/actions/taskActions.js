import axios from 'axios';
import handleRequest from './request';
import { GET_TASK, GET_TASKS, UPDATE_TASK, ADD_TASK, DELETE_TASK } from './types';

const makeRequest = (projectId, action, actionFn, history) => dispatch => {
  const requestFn = () => actionFn(`/api/project/${projectId}/task`);
  handleRequest(dispatch, action, requestFn, () => history && history.push(`/taskBoard/${projectId}`));
};

export const addTask = (projectId, task, history) => {
  return makeRequest(projectId, ADD_TASK, urlRoot => axios.post(urlRoot, task), history);
};

export const getTask = (projectId, taskId) => {
  return makeRequest(projectId, GET_TASK, urlRoot => axios.get(`${urlRoot}/${taskId}`));
};

export const getTasks = projectId => {
  return makeRequest(projectId, GET_TASKS, urlRoot => axios.get(urlRoot));
};

export const updateTask = (projectId, task, history) => {
  return makeRequest(projectId, UPDATE_TASK, urlRoot => axios.put(`${urlRoot}/${task.id}`, task), history);
};
export const deleteTask = (projectId, taskId) => {
  if (!window.confirm('Are you sure you want to to delete this task?')) {
    return;
  }
  return makeRequest(projectId, DELETE_TASK, urlRoot =>
    axios.delete(`${urlRoot}/${taskId}`).then(() => {
      return {
        data: taskId
      };
    })
  );
};

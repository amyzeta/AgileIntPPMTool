import axios from 'axios';
import {
  REQUEST_STARTS,
  REQUEST_SUCCEEDS,
  REQUEST_FAILS,
  GET_TASK,
  GET_TASKS,
  UPDATE_TASK,
  ADD_TASK
} from './types';

const makeRequest = (
  projectId,
  action,
  actionFn,
  history
) => async dispatch => {
  dispatch({
    type: REQUEST_STARTS
  });
  try {
    const res = await actionFn(`/api/project/${projectId}/task`);
    history && history.push(`/taskBoard/${projectId}`);
    dispatch({
      type: action,
      payload: res && res.data
    });
    dispatch({
      type: REQUEST_SUCCEEDS
    });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILS,
      payload: error.response.data
    });
  }
};

export const addTask = (projectId, task, history) => {
  return makeRequest(
    projectId,
    ADD_TASK,
    urlRoot => axios.post(urlRoot, task),
    history
  );
};

export const getTask = (projectId, taskId) => {
  return makeRequest(projectId, GET_TASK, urlRoot =>
    axios.get(`${urlRoot}/${taskId}`)
  );
};

export const getTasks = projectId => {
  return makeRequest(projectId, GET_TASKS, urlRoot => axios.get(urlRoot));
};

export const updateTask = (projectId, task, history) => {
  return makeRequest(
    projectId,
    UPDATE_TASK,
    urlRoot => axios.put(`${urlRoot}/${task.id}`, task),
    history
  );
};

import axios from 'axios';
import { GET_ERRORS, GET_TASKS } from './types';

const URL_ROOT = '/api/project';

export const addTask = (projectId, task, history) => async dispatch => {
  try {
    await axios.post(`${URL_ROOT}/${projectId}/task`, task);
    history.push(`/projectBoard/${projectId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getTasks = projectId => async dispatch => {
  const res = await axios.get(`${URL_ROOT}/${projectId}/task`);
  dispatch({
    type: GET_TASKS,
    payload: res.data
  });
};

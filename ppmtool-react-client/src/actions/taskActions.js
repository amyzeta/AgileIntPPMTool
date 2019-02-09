import axios from 'axios';
import { GET_TASKS, GET_TASK } from './types';

const URL_ROOT = '/api/project';

const makeRequest = (actionType, actionFn) => async dispatch => {
  dispatch({
    type: actionType.REQUEST
  });
  try {
    const res = await actionFn();
    dispatch({
      type: actionType.SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: actionType.FAILURE,
      payload: error.response.data
    });
  }
};

export const addTask = (projectId, task, history) => {
  return makeRequest(GET_TASK, () =>
    axios.post(`${URL_ROOT}/${projectId}/task`, task)
  );
};

export const getTasks = projectId => {
  return makeRequest(GET_TASKS, () =>
    axios.get(`${URL_ROOT}/${projectId}/task`)
  );
};

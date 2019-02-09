import {
  REQUEST_STARTS,
  REQUEST_FAILS,
  REQUEST_SUCCEEDS,
  GET_TASK,
  DELETE_TASK,
  GET_TASKS
} from '../actions/types';

const initialState = {
  tasks: [],
  task: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_STARTS:
      return {
        ...state,
        isFetching: true,
        error: undefined
      };
    case REQUEST_FAILS:
      return { ...state, errors: payload, isFetching: false };
    case REQUEST_SUCCEEDS:
      return { ...state, isFetching: false };
    case GET_TASKS:
      return { ...state, tasks: payload };
    case GET_TASK:
      return { ...state, task: payload };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(p => p.id !== payload)
      };
    default:
      return state;
  }
};

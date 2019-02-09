import { GET_TASK, DELETE_TASK, GET_TASKS } from '../actions/types';

const initialState = {
  tasks: [],
  task: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKS.SUCCESS:
      return { ...state, tasks: payload, isFetching: false };
    case GET_TASKS.FAILURE:
      return { ...state, error: payload, isFetching: false };
    case GET_TASK:
      return { ...state, task: payload };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(p => p.id !== payload)
      };
    case GET_TASKS.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined
      };
    default:
      return state;
  }
};

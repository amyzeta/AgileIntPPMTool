import { GET_TASKS, GET_TASK, DELETE_TASK } from '../actions/types';

const initialState = {
  tasks: [],
  task: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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

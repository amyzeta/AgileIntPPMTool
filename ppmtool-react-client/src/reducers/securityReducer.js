import { LOG_IN, LOG_OUT } from '../actions/types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, loggedIn: true };
    case LOG_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

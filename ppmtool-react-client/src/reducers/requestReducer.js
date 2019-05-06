import { REQUEST_STARTS, REQUEST_FAILS, REQUEST_SUCCEEDS } from '../actions/types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_STARTS:
      return {
        ...state,
        isFetching: true,
        errors: {}
      };
    case REQUEST_FAILS:
      return { ...state, errors: payload, isFetching: false };
    case REQUEST_SUCCEEDS:
      return { ...state, isFetching: false, errors: {} };
    default:
      return state;
  }
};

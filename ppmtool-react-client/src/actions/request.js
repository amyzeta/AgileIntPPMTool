import { REQUEST_STARTS, REQUEST_SUCCEEDS, REQUEST_FAILS } from './types';

export default async (dispatch, successAction, requestFn, successCallback) => {
  dispatch({
    type: REQUEST_STARTS
  });
  try {
    const res = await requestFn();
    successCallback && successCallback(res);
    if (successAction) {
      dispatch({
        type: successAction,
        payload: res && res.data
      });
    }
    dispatch({
      type: REQUEST_SUCCEEDS
    });
  } catch (e) {
    if (!e.response) {
      // client side error (ie. bug) - we want this to appear in the console
      throw e;
    }
    dispatch({
      type: REQUEST_FAILS,
      payload: e.response.data
    });
  }
};

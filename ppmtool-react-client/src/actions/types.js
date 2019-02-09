const requestActions = function() {
  return {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
  };
};

export const GET_ERRORS = 'GET_ERRORS';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const GET_TASKS = requestActions();
export const GET_TASK = requestActions();
export const DELETE_TASK = 'DELETE_TASK';

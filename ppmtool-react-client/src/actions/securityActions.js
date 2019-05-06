import axios from 'axios';
import handleRequest from './request';
import { LOG_IN, LOG_OUT } from './types';

export const createNewUser = (newUser, history) => dispatch => {
  const requestFn = () => axios.post('/api/user/register', newUser);
  handleRequest(dispatch, undefined, requestFn, () => history.push('/login'));
};

export const logIn = (user, history) => dispatch => {
  const requestFn = () => axios.post('/api/user/login', user);
  const successFn = res => history.push('/dashboard');
  handleRequest(dispatch, LOG_IN, requestFn, successFn);
};

export const logOut = (user, history) => dispatch => {
  const requestFn = () => axios.post('/api/user/login', user);
  const successFn = history.push('/login');
  handleRequest(dispatch, LOG_OUT, requestFn, successFn);
};

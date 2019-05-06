import axios from 'axios';
import jwt_decode from 'jwt-decode';

// HTTP spec says headers are case insensitive. Tomcat converts to lower case.
const AUTHORIZATION = 'authorization';

const setJwtToken = token => {
  if (token) {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', jwt_decode(token).sub);
  } else {
    console.log('clearing jwt token');
    localStorage.removeItem('jwtToken', token);
    localStorage.removeItem('username');
  }
};

export const getLoggedInUser = () => localStorage.username;
export const logOut = () => setJwtToken(undefined);

axios.interceptors.request.use(function(request) {
  if (localStorage.jwtToken) {
    request.headers[AUTHORIZATION] = 'Bearer ' + localStorage.jwtToken;
  }
  return request;
});

axios.interceptors.response.use(
  function(response) {
    const newToken = response.headers[AUTHORIZATION];
    if (newToken) {
      setJwtToken(newToken);
    }
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      setJwtToken(undefined);
    }
    return Promise.reject(error);
  }
);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLoggedInUser } from '../../security';

const SecuredRoute = ({ component: Component, ...otherProps }) => {
  const render = props => (getLoggedInUser() ? <Component {...props} /> : <Redirect to="/login" />);
  return <Route {...otherProps} render={render} />;
};
export default SecuredRoute;

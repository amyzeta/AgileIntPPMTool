import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser, logOut } from '../../security';
import { connect } from 'react-redux';

function HeaderItem(props) {
  return (
    <li className="nav-item">
      <Link to={props.to} className="nav-link" onClick={props.onClick}>
        {props.content}
      </Link>
    </li>
  );
}

class Header extends Component {
  render() {
    const loggedInUser = getLoggedInUser();
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Personal Project Management Tool
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">{loggedInUser && <HeaderItem to="/dashboard" content="Dashboard" />}</ul>

            <ul className="navbar-nav ml-auto">
              {!loggedInUser && <HeaderItem to="/register" content="Sign Up" />}
              {!loggedInUser && <HeaderItem to="/login" content="Log In" />}
              {loggedInUser && (
                <HeaderItem
                  to="/dashboard"
                  content={
                    <span>
                      <i className="fas fa-user-circle mr-1" />
                      {loggedInUser}
                    </span>
                  }
                />
              )}
              {loggedInUser && <HeaderItem to="/" content="Log Out" onClick={this.props.logOut} />}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.security.loggedIn
});

// although the header doesn't use redux state we do want it to refresh when we log in/out.
export default connect(
  mapStateToProps,
  { logOut }
)(Header);

import React, { Component } from 'react';
import ItemForm from '../ItemForm';
import { logIn } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../../security';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: '',
        password: ''
      },
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState(prevState => ({ errors: this.props.errors }));
    }
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState, props) => ({
      login: {
        ...prevState.login,
        [name]: value
      }
    }));
  };

  render() {
    if (getLoggedInUser()) {
      return <Redirect to="/dashboard" />;
    }
    const fields = [
      {
        tag: 'input',
        type: 'text',
        name: 'username',
        placeholder: 'Email Address'
      },
      {
        tag: 'input',
        type: 'password',
        name: 'password',
        placeholder: 'Password'
      }
    ];
    const titleFragment = <h1 className="display-4 text-center">Log In</h1>;
    return (
      <ItemForm
        item={this.state.login}
        fields={fields}
        titleFragment={titleFragment}
        errors={this.state.errors}
        onChange={this.onChange}
        submitItem={user => this.props.logIn(user, this.props.history)}
      />
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  logIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.request.errors
});

export default connect(
  mapStateToProps,
  { logIn }
)(Login);

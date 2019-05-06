import React, { Component } from 'react';
import ItemForm from '../ItemForm';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../../security';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration: {
        username: '',
        fullName: '',
        password: '',
        confirmPassword: ''
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
      registration: {
        ...prevState.registration,
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
        name: 'fullName',
        placeholder: 'Full Name'
      },
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
      },
      {
        tag: 'input',
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'Confirm Password'
      }
    ];
    const titleFragment = (
      <React.Fragment>
        <h1 className="display-4 text-center">Sign Up</h1>
        <p className="lead text-center">Create your Account</p>
      </React.Fragment>
    );
    return (
      <ItemForm
        item={this.state.registration}
        fields={fields}
        titleFragment={titleFragment}
        errors={this.state.errors}
        onChange={this.onChange}
        submitItem={newUser => this.props.createNewUser(newUser, this.props.history)}
      />
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object,
  createNewUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.request.errors
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);

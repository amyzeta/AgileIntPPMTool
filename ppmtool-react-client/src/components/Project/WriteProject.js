import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemForm from '../ItemForm';

class WriteProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        id: '',
        projectName: '',
        projectIdentifier: '',
        description: '',
        startDate: '',
        endDate: ''
      },
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState(prevState => ({ errors: this.props.errors }));
    }
    if (this.props.project !== prevProps.project) {
      this.setState(prevState => ({ project: this.props.project }));
    }
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState, props) => ({
      project: {
        ...prevState.project,
        [name]: value
      }
    }));
  };

  render() {
    const fields = [
      {
        tag: 'input',
        type: 'text',
        name: 'projectName',
        placeholder: 'Project Name'
      },
      {
        tag: 'input',
        type: 'text',
        name: 'projectIdentifier',
        placeholder: 'Project Identifier',
        disabled: !this.props.canModifyIdentifier
      },
      {
        tag: 'textarea',
        name: 'description',
        placeholder: 'Project Description'
      },
      {
        tag: 'input',
        type: 'date',
        name: 'startDate'
      },
      {
        tag: 'input',
        type: 'date',
        name: 'endDate'
      }
    ];
    const titleFragment = (
      <React.Fragment>
        <h5 className="display-4 text-center">{this.props.title}</h5>
        <hr />
      </React.Fragment>
    );
    return (
      <ItemForm
        item={this.state.project}
        errors={this.state.errors}
        fields={fields}
        titleFragment={titleFragment}
        onChange={this.onChange}
        submitItem={this.props.submitProject}
      />
    );
  }
}

WriteProject.propTypes = {
  title: PropTypes.string.isRequired,
  canModifyIdentifier: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object,
  submitProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.request.errors
});

export default connect(
  mapStateToProps,
  null
)(WriteProject);

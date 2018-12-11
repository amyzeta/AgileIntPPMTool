import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProjectForm from "../Project/ProjectForm";

class WriteProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: ""
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

  onSubmit = e => {
    e.preventDefault();
    this.props.submitProject({ ...this.state.project });
  };

  render() {
    return (
      <ProjectForm
        project={this.state.project}
        errors={this.state.errors}
        title={this.props.title}
        canModifyIdentifier={this.props.canModifyIdentifier}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

WriteProject.propTypes = {
  title: PropTypes.string.isRequired,
  canModifyIdentifier: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  submitProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(WriteProject);

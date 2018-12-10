import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import ProjectForm from "../Layout/ProjectForm";

class AddProject extends Component {
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
    const newProject = { ...this.state.project };
    this.props.createProject(newProject, this.props.history);
  };

  render() {
    return (
      <ProjectForm
        project={this.state.project}
        errors={this.state.errors}
        title="Create Project"
        canModifyIdentifier={true}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject, updateProject } from "../../actions/projectActions";
import ProjectForm from "../Layout/ProjectForm";

class UpdateProject extends Component {
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

  componentDidMount() {
    console.log("componentDidMount");
    this.props.getProject(this.props.match.params.id, this.props.history);
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
    const updatedProject = { ...this.state.project };
    this.props.updateProject(updatedProject, this.props.history);
  };

  render() {
    return (
      <ProjectForm
        project={this.state.project}
        errors={this.state.errors}
        title="Update Project"
        canModifyIdentifier={false}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

UpdateProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProject, updateProject }
)(UpdateProject);

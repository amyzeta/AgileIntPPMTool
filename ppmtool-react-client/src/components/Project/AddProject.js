import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import WriteProject from "./WriteProject";

class AddProject extends Component {
  render() {
    return (
      <WriteProject
        title="Create Project"
        canModifyIdentifier={true}
        submitProject={project =>
          this.props.createProject(project, this.props.history)
        }
      />
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProject }
)(AddProject);

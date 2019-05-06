import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject, updateProject } from '../../actions/projectActions';
import WriteProject from './WriteProject';

class UpdateProject extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id, this.props.history);
  }

  render() {
    return (
      <WriteProject
        project={this.props.project}
        title="Update Project"
        canModifyIdentifier={false}
        submitProject={project => this.props.updateProject(project, this.props.history)}
      />
    );
  }
}

UpdateProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { getProject, updateProject }
)(UpdateProject);

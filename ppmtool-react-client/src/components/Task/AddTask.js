import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../../actions/taskActions';
import PropTypes from 'prop-types';
import WriteTask from './WriteTask';

class AddTask extends Component {
  render() {
    return (
      <WriteTask
        title="Add Task"
        projectId={this.props.match.params.projectId}
        submitTask={task => this.props.addTask(this.props.match.params.projectId, task, this.props.history)}
      />
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTask }
)(AddTask);

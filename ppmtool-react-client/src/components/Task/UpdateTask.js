import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask, updateTask } from '../../actions/taskActions';
import PropTypes from 'prop-types';

import WriteTask from './WriteTask';

class UpdateTask extends Component {
  componentDidMount() {
    this.props.getTask(
      this.props.match.params.projectId,
      this.props.match.params.taskId,
      this.props.history
    );
  }

  render() {
    return (
      <WriteTask
        title="Update Task"
        subtitle={this.props.task && this.props.task.taskSequence}
        projectId={this.props.match.params.projectId}
        submitTask={task =>
          this.props.updateTask(
            this.props.match.params.projectId,
            task,
            this.props.history
          )
        }
      />
    );
  }
}

UpdateTask.propTypes = {
  getTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task.task
});

export default connect(
  mapStateToProps,
  { getTask, updateTask }
)(UpdateTask);

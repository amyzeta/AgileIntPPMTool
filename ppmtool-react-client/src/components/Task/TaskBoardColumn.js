import React, { Component } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import { Status } from './TaskTypes';

export default class TaskBoardColumn extends Component {
  render() {
    const tasks = this.props.tasks
      .filter(task => task.status === this.props.status)
      .map(task => (
        <Task key={task.id} projectId={this.props.projectId} task={task} />
      ));
    return (
      <div className="col-md-4" key={this.props.status}>
        <div className="card text-center mb-2">
          <div className={`card-header ${this.props.taskClasses}`}>
            <h3>{Status[this.props.status]}</h3>
          </div>
        </div>
        {tasks}
      </div>
    );
  }
}

TaskBoardColumn.propTypes = {
  projectId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  taskClasses: PropTypes.string.isRequired
};

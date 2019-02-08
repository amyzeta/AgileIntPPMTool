import React, { Component } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

export default class TaskBoardColumn extends Component {
  render() {
    const tasks = this.props.tasks
      .filter(task => task.status === this.props.status)
      .map(task => <Task key={task.id} task={task} />);
    return (
      <div className="col-md-4">
        <div className="card text-center mb-2">
          <div className={`card-header ${this.props.taskStyles}`}>
            <h3>{this.props.title}</h3>
          </div>
        </div>
        {tasks}
      </div>
    );
  }
}

TaskBoardColumn.propTypes = {
  tasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  taskStyles: PropTypes.string.isRequired
};

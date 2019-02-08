import React, { Component } from 'react';
import { Priority } from './TaskTypes';

class Task extends Component {
  render() {
    const task = this.props.task;
    const priorityString = Priority[task.priority];
    const priorityClass = task.priority === 1 ? 'bg-danger text-light' : '';
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {task.taskSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.summary}</h5>
          <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
          <a href="#" className="btn btn-primary">
            View / Update
          </a>

          <button className="btn btn-danger ml-4">Delete</button>
        </div>
      </div>
    );
  }
}
export default Task;

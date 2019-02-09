import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks } from '../../actions/taskActions';
import TaskBoardColumn from './TaskBoardColumn';
import { mapToElements } from '../ComponentUtilities';

class TaskBoard extends Component {
  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.getTasks(projectId);
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="container">
          <i className="fas fa-spinner fa-spin" role="status" />
        </div>
      );
    }
    const isEmpty = o => !o || Object.keys(o).length === 0;
    const error = this.props.error;
    if (!isEmpty(error)) {
      return mapToElements(error, function(key, value) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {value}
          </div>
        );
      });
    }
    const projectId = this.props.match.params.projectId;
    const tasks = this.props.tasks;
    return (
      <div className="container">
        <Link to={`/addTask/${projectId}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <div className="container">
          <div className="row">
            <TaskBoardColumn
              tasks={tasks}
              status="TO_DO"
              taskStyles="bg-secondary text-white"
            />
            <TaskBoardColumn
              tasks={tasks}
              status="IN_PROGRESS"
              taskStyles="bg-primary text-white"
            />
            <TaskBoardColumn
              tasks={tasks}
              status="DONE"
              taskStyles="bg-success text-white"
            />
          </div>
        </div>
      </div>
    );
  }
}

TaskBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getTasks: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tasks: state.task.tasks,
  isFetching: state.task.isFetching !== false,
  error: state.task.error
});

export default connect(
  mapStateToProps,
  { getTasks }
)(TaskBoard);

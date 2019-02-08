import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks } from '../../actions/taskActions';
import TaskBoardColumn from './TaskBoardColumn';

class TaskBoard extends Component {
  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.getTasks(projectId);
  }
  render() {
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
              title="To Do"
              taskStyles="bg-secondary text-white"
            />
            <TaskBoardColumn
              tasks={tasks}
              status="IN_PROGRESS"
              title="In Progress"
              taskStyles="bg-primary text-white"
            />
            <TaskBoardColumn
              tasks={tasks}
              status="DONE"
              title="Done"
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
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.task.tasks
});

export default connect(
  mapStateToProps,
  { getTasks }
)(TaskBoard);

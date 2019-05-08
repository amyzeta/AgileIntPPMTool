import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks } from '../../actions/taskActions';
import TaskBoardColumn from './TaskBoardColumn';
import { mapToElements } from '../ComponentUtilities';
import LoadableComponent from '../LoadableComponent';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId
    };
  }

  componentDidMount() {
    this.props.getTasks(this.state.projectId);
  }

  render() {
    return (
      <LoadableComponent>
        <div className="container">
          <Link to={`/taskBoard/${this.state.projectId}/addTask`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
          <div className="container">
            <div className="row">{this.taskColumns()}</div>
          </div>
        </div>
      </LoadableComponent>
    );
  }

  taskColumns() {
    const statusToClasses = {
      TO_DO: 'bg-secondary text-white',
      IN_PROGRESS: 'bg-primary text-white',
      DONE: 'bg-success text-white'
    };
    const tasks = this.props.tasks;
    return mapToElements(statusToClasses, (status, classes) => {
      return (
        <TaskBoardColumn
          key={status}
          projectId={this.state.projectId}
          tasks={tasks}
          status={status}
          taskClasses={classes}
        />
      );
    });
  }
}

TaskBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.task.tasks,
  isFetching: state.request.isFetching !== false,
  errors: state.request.errors
});

export default connect(
  mapStateToProps,
  { getTasks }
)(TaskBoard);

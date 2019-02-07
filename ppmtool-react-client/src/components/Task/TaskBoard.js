import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks } from '../../actions/taskActions';

class TaskBoard extends Component {
  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.getTasks(projectId);
  }
  render() {
    const projectId = this.props.match.params.projectId;
    const tasks = this.props.tasks.map(task => (
      <Task key={task.id} task={task} />
    ));
    return (
      <div className="container">
        <Link to={`/addTask/${projectId}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>TO DO</h3>
                </div>
              </div>
              {
                // <!-- SAMPLE TASK STARTS HERE -->
              }
              {tasks}
              {
                //<!-- SAMPLE TASK ENDS HERE -->
              }
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-primary text-white">
                  <h3>In Progress</h3>
                </div>
              </div>
              {
                // <!-- SAMPLE TASK STARTS HERE -->
              }

              {
                //<!-- SAMPLE TASK ENDS HERE -->
              }
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-success text-white">
                  <h3>Done</h3>
                </div>
              </div>
              {
                // <!-- SAMPLE TASK STARTS HERE -->
              }

              {
                //<!-- SAMPLE TASK ENDS HERE -->
              }
            </div>
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

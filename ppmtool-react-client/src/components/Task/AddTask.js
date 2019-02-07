import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTask } from '../../actions/taskActions';
import PropTypes from 'prop-types';
import ItemForm from '../ItemForm';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      task: {
        id: '',
        summary: '',
        acceptanceCriteria: '',
        dueDate: '',
        priority: 3,
        status: ''
      },
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState(prevState => ({ errors: this.props.errors }));
    }
    if (this.props.task !== prevProps.task) {
      this.setState(prevState => ({ task: this.props.task }));
    }
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState, props) => ({
      task: {
        ...prevState.task,
        [name]: value
      }
    }));
  };

  render() {
    const fields = [
      {
        tag: 'input',
        type: 'text',
        name: 'summary',
        placeholder: 'Task Summary'
      },
      {
        tag: 'textarea',
        type: 'text',
        name: 'acceptanceCriteria',
        placeholder: 'Acceptance Criteria'
      },
      {
        tag: 'input',
        type: 'date',
        name: 'dueDate'
      },
      {
        tag: 'select',
        name: 'priority',
        content: (
          <React.Fragment>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </React.Fragment>
        )
      },
      {
        tag: 'select',
        name: 'status',
        content: (
          <React.Fragment>
            <option value="TO_DO">TO DO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </React.Fragment>
        )
      }
    ];
    const titleFragment = (
      <React.Fragment>
        <Link
          to={`/taskBoard/${this.props.projectId}`}
          className="btn btn-light"
        >
          Back to Task Board
        </Link>
        <h4 className="display-4 text-center">Add Task</h4>
        <p className="lead text-center">Project Name + Project Code</p>
      </React.Fragment>
    );
    return (
      <ItemForm
        item={this.state.task}
        errors={this.state.errors}
        fields={fields}
        titleFragment={titleFragment}
        onChange={this.onChange}
        submitItem={task =>
          this.props.addTask(
            this.props.match.params.projectId,
            task,
            this.props.history
          )
        }
      />
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task.task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTask }
)(AddTask);

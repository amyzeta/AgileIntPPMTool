import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemForm from '../ItemForm';
import { Priority, Status } from './TaskTypes';

class WriteTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      task: {
        id: '',
        summary: '',
        acceptanceCriteria: '',
        dueDate: '',
        priority: 3,
        status: 'TO_DO'
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
        options: Priority
      },
      {
        tag: 'select',
        name: 'status',
        options: Status
      }
    ];
    const titleFragment = (
      <React.Fragment>
        <Link to={`/taskBoard/${this.state.projectId}`} className="btn btn-light">
          Back to Task Board
        </Link>
        <h4 className="display-4 text-center">{this.props.title}</h4>
        <p className="lead text-center">{this.props.subtitle}</p>
      </React.Fragment>
    );
    return (
      <ItemForm
        item={this.state.task}
        errors={this.state.errors}
        fields={fields}
        titleFragment={titleFragment}
        onChange={this.onChange}
        submitItem={task => this.props.submitTask(task)}
      />
    );
  }
}

WriteTask.propTypes = {
  task: PropTypes.object.isRequired,
  errors: PropTypes.object,
  submitTask: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  task: state.task.task,
  errors: state.request.errors
});

export default connect(
  mapStateToProps,
  null
)(WriteTask);

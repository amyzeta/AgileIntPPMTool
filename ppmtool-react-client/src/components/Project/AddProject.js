import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import AddProjectFormField from "./AddProjectFormField";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const errors = this.state.errors;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <AddProjectFormField
                  tag="input"
                  type="text"
                  name="projectName"
                  placeholder="Project Name"
                  value={this.state.projectName}
                  error={errors.projectName}
                  onChange={this.onChange}
                />
                <AddProjectFormField
                  tag="input"
                  type="text"
                  name="projectIdentifier"
                  placeholder="Project Identifier"
                  value={this.state.projectIdentifier}
                  error={errors.projectIdentifier}
                  onChange={this.onChange}
                />
                <AddProjectFormField
                  tag="textarea"
                  name="description"
                  placeholder="Project Description"
                  value={this.state.description}
                  error={errors.description}
                  onChange={this.onChange}
                />
                <h6>Start Date</h6>
                <AddProjectFormField
                  tag="input"
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  error={errors.startDate}
                  onChange={this.onChange}
                />
                <h6>Estimated End Date</h6>
                <AddProjectFormField
                  tag="input"
                  type="date"
                  name="endDate"
                  value={this.state.endDate}
                  error={errors.endDate}
                  onChange={this.onChange}
                />

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject);

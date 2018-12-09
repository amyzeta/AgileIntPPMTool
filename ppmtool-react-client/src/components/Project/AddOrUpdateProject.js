import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProject,
  getProject,
  updateProject
} from "../../actions/projectActions";
import classnames from "classnames";

class AddOrUpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: ""
      },
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.create) {
      this.props.getProject(this.props.match.params.id, this.props.history);
    }
  }

  // TODO deprecated. Investigate getDerivedStateFromProps()
  // TODO BUG a failed create/update wipes out existing fields from the project giving incorrect validaiton warnings
  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors,
      project: nextProps.project
    });
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState, props) => ({
      project: {
        ...prevState.project,
        [name]: value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const newOrUpdatedProject = { ...this.state.project };
    const action = this.props.create
      ? this.props.createProject
      : this.props.updateProject;
    action(newOrUpdatedProject, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    const fields = [
      {
        tag: "input",
        type: "text",
        name: "projectName",
        placeholder: "Project Name"
      },
      {
        tag: "input",
        type: "text",
        name: "projectIdentifier",
        placeholder: "Project Identifier",
        disabled: !this.props.create
      },
      {
        tag: "textarea",
        name: "description",
        placeholder: "Project Description"
      },
      {
        tag: "input",
        type: "date",
        name: "startDate"
      },
      {
        tag: "input",
        type: "date",
        name: "endDate"
      }
    ];
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                {this.props.create ? "Create Project" : "Update Project"}
              </h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                {fields.map((f, i) => (
                  <div className="form-group" key={i}>
                    <f.tag
                      type={f.type}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors[f.name]
                      })}
                      placeholder={f.placeholder}
                      name={f.name}
                      value={this.state.project[f.name]}
                      onChange={this.onChange}
                      disabled={f.disabled}
                    />
                    {errors[f.name] && (
                      <div className="invalid-feedback">{errors[f.name]} </div>
                    )}
                  </div>
                ))}
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

AddOrUpdateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  create: PropTypes.bool,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject, getProject, updateProject }
)(AddOrUpdateProject);

import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class ProjectForm extends Component {
  render() {
    const errors = this.props.errors;
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
        disabled: !this.props.canModifyIdentifier
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
              <h5 className="display-4 text-center">{this.props.title}</h5>
              <hr />
              <form onSubmit={this.props.onSubmit}>
                {fields.map((f, i) => (
                  <div className="form-group" key={i}>
                    <f.tag
                      type={f.type}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors[f.name]
                      })}
                      placeholder={f.placeholder}
                      name={f.name}
                      value={this.props.project[f.name]}
                      onChange={this.props.onChange}
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

ProjectForm.propTypes = {
  title: PropTypes.string.isRequired,
  canModifyIdentifier: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ProjectForm;

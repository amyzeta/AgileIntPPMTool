import React, { Component } from "react";
import classnames from "classnames";

class AddProjectFormField extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form-group">
        <this.props.tag
          type={this.props.type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": this.props.error
          })}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        {this.props.error && (
          <div className="invalid-feedback">{this.props.error}</div>
        )}
      </div>
    );
  }
}
export default AddProjectFormField;

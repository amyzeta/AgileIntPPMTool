import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ItemForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.submitItem({ ...this.props.item });
  };

  getSelectOptions = type => {
    if (!type) {
      return undefined;
    }
    const options = [];
    for (var key in type) {
      if (type.hasOwnProperty(key)) {
        options.push(
          <option key={key} value={key}>
            {type[key]}
          </option>
        );
      }
    }
    return <React.Fragment>{options}</React.Fragment>;
  };

  render() {
    const errors = this.props.errors;
    const fields = this.props.fields;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.props.titleFragment}
              <form onSubmit={this.onSubmit}>
                {fields.map((f, i) => (
                  <div className="form-group" key={i}>
                    <f.tag
                      type={f.type}
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors[f.name]
                      })}
                      placeholder={f.placeholder}
                      name={f.name}
                      value={this.props.item[f.name]}
                      onChange={this.props.onChange}
                      disabled={f.disabled}
                    >
                      {this.getSelectOptions(f.options)}
                    </f.tag>
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

ItemForm.propTypes = {
  titleFragment: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  submitItem: PropTypes.func.isRequired
};

export default ItemForm;

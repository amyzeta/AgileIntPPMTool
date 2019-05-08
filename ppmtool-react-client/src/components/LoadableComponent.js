import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const mapToElements = (object, itemFn) => {
  if (!object) {
    return undefined;
  }
  const elements = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      elements.push(itemFn(key, object[key]));
    }
  }
  return <React.Fragment>{elements}</React.Fragment>;
};

const isEmpty = o => !o || Object.keys(o).length === 0;

const errorsAsObject = e => {
  if (e === Object(e)) {
    return e;
  } else {
    // 'somehow' we got a string instead of an Object
    // (Actually I know this what happens when the server is down)
    return {
      Error: e
    };
  }
};

class LoadableComponent extends Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="container">
          <i className="fas fa-spinner fa-spin" role="status" />
        </div>
      );
    }
    if (!isEmpty(this.props.errors)) {
      return mapToElements(errorsAsObject(this.props.errors), (key, value) => {
        return (
          <div className="alert alert-danger text-center" key={key} role="alert">
            {value}
          </div>
        );
      });
    }
    return this.props.children;
  }
}

LoadableComponent.propTypes = {
  errors: PropTypes.object,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.request.isFetching !== false,
  errors: state.request.errors
});

export default connect(mapStateToProps)(LoadableComponent);

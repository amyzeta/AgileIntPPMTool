import React, { Component } from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import { PropTypes } from 'prop-types';
import LoadableComponent from './LoadableComponent';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const projects = this.props.projects;
    return (
      <LoadableComponent>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton />
                <br />
                <hr />
                {projects.map((p, i) => (
                  <ProjectItem project={p} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </LoadableComponent>
    );
  }
}
Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  projects: state.project.projects
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);

import axios from 'axios';
import handleRequest from './request';
import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types';

const makeRequest = (action, actionFn, history) => dispatch => {
  handleRequest(dispatch, action, () => actionFn('/api/project'), () => history && history.push('/dashboard'));
};

export const createProject = (project, history) => makeRequest(null, urlRoot => axios.post(urlRoot, project), history);

export const updateProject = (project, history) =>
  makeRequest(null, urlRoot => axios.put(`${urlRoot}/${project.id}`, project), history);

export const getProjects = () => makeRequest(GET_PROJECTS, urlRoot => axios.get(urlRoot));

export const getProject = (id, history) => makeRequest(GET_PROJECT, urlRoot => axios.get(`${urlRoot}/${id}`));

export const deleteProject = id => {
  if (!window.confirm('Are you sure you want to to delete this project?')) {
    return;
  }
  return makeRequest(DELETE_PROJECT, urlRoot =>
    axios.delete(`${urlRoot}/${id}`).then(() => {
      return {
        data: id
      };
    })
  );
};

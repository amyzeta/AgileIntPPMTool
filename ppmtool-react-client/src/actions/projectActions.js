import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const URL_ROOT = "/api/project";

const writeProject = (doRequest, history) => async dispatch => {
  try {
    await doRequest();
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
export const createProject = (project, history) =>
  writeProject(() => axios.post(URL_ROOT, project), history);

export const updateProject = (project, history) =>
  writeProject(() => axios.put(`${URL_ROOT}/${project.id}`, project), history);

export const getProjects = () => async dispatch => {
  const res = await axios.get(URL_ROOT);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`${URL_ROOT}/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = id => async dispatch => {
  if (!window.confirm("Are you sure you want to to delete this project?")) {
    return;
  }
  await axios.delete(`${URL_ROOT}/${id}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: id
  });
};

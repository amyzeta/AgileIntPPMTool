import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const URL_ROOT = "http://localhost:8080/api/project";

// TODO these methods are too similar, pull out common code
export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post(URL_ROOT, project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updateProject = (project, history) => async dispatch => {
  try {
    await axios.put(`${URL_ROOT}/${project.id}`, project);
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

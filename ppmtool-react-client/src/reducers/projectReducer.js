import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "../actions/types";
const initialState = {
  projects: [],
  project: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return { ...state, projects: payload };
    case GET_PROJECT:
      return { ...state, project: payload };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== payload)
      };
    default:
      return state;
  }
};

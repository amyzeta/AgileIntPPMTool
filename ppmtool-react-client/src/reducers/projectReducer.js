import { GET_PROJECTS, GET_PROJECT } from "../actions/types";
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
    default:
      return state;
  }
};

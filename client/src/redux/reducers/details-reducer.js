import { LOAD_TOGGLE, GET_BUILD_INFO, GET_REPONAME, GET_REBUILD_INFO, GET_LOGS } from '../actions/details-actions';

const initianState = {
  isLoading: false,
  repoName: '',
  buildInfo: {},
  rebuildInfo: {},
  logs: ''
};

export function detailsReducer(state = initianState, action) {
  switch (action.type) {
    case GET_BUILD_INFO:
      return { ...state, buildInfo: { ...action.payload } };
    case LOAD_TOGGLE:
      return { ...state, isLoading: action.payload };
    case GET_REPONAME:
      return { ...state, repoName: action.payload };
    case GET_REBUILD_INFO:
      return { ...state, rebuildInfo: { ...action.payload } };
    case GET_LOGS:
      return { ...state, logs: action.payload };
    default:
      return state;
  }
}

import { GET_BUILD_LIST, LOAD_TOGGLE, GET_REPONAME, RUN_NEW_BUILD } from '../actions/history-actions';

const initialState = {
  isLoading: false,
  buildList: [],
  repoName: '',
  runNewBuild: false
}

export function historyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUILD_LIST:
      return { ...state, buildList: [...action.payload] };
    case LOAD_TOGGLE:
      return { ...state, isLoading: action.payload };
    case GET_REPONAME:
      return { ...state, repoName: action.payload };
    case RUN_NEW_BUILD:
      return { ...state, runNewBuild: action.payload };
    default:
      return state;
  }
}

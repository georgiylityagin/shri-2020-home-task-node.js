import {
  LOAD_TOGGLE,
  GET_BUILD_INFO,
  GET_REPONAME,
  GET_REBUILD_INFO,
  GET_LOGS,
} from '../actions/details-actions';

export type isLoading = boolean;
export type repoName = string;
export type logs = string;
export type buildInfo = {
  id?: string;
  configurationId?: string;
  buildNumber?: number;
  commitMessage?: string;
  commitHash?: string;
  branchName?: string;
  authorName?: string;
  status?: string;
  start?: string;
  duration?: number;
}
export type rebuildInfo = {
  id?: string;
  configurationId?: string;
  buildNumber?: number;
  commitMessage?: string;
  commitHash?: string;
  branchName?: string;
  authorName?: string;
  status?: string;
  start?: string;
  duration?: number;
}

interface InitialState {
  isLoading: isLoading;
  repoName: repoName;
  buildInfo: buildInfo;
  rebuildInfo: rebuildInfo;
  logs: logs
}

const initianState: InitialState = {
  isLoading: false,
  repoName: '',
  buildInfo: {},
  rebuildInfo: {},
  logs: '',
};

enum actionType {
  GET_BUILD_INFO = 'GET_BUILD_INFO',
  LOAD_TOGGLE = 'LOAD_TOGGLE',
  GET_REPONAME = 'GET_REPONAME',
  GET_REBUILD_INFO = 'GET_REBUILD_INFO',
  GET_LOGS = 'GET_LOGS'
}


interface detailsAction<T, D> {
    type: T;
    payload: D;
}

export function detailsReducer(state = initianState, action: detailsAction<actionType, InitialState>) {
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

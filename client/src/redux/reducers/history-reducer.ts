import {
  GET_BUILD_LIST,
  LOAD_TOGGLE,
  GET_REPONAME,
  RUN_NEW_BUILD,
} from '../actions/history-actions';
import { buildInfo } from './details-reducer';

export type IsLoading = boolean;
export type RepoName = string;
export type RunNewBuild = boolean;
export type BuildListType = buildInfo[];

interface InitialState {
  isLoading: IsLoading;
  buildList: BuildListType;
  repoName: RepoName;
  runNewBuild: RunNewBuild;
}

const initialState: InitialState = {
  isLoading: false,
  buildList: [],
  repoName: '',
  runNewBuild: false,
};

enum actionType {
  GET_BUILD_LIST = 'GET_BUILD_LIST',
  LOAD_TOGGLE = 'LOAD_TOGGLE',
  GET_REPONAME = 'GET_REPONAME',
  RUN_NEW_BUILD = 'RUN_NEW_BUILD'
}


interface historyAction<T, D> {
    type: T;
    payload: D;
}

export function historyReducer(state = initialState, action: historyAction<actionType, InitialState>) {
  switch (action.type) {
    case GET_BUILD_LIST:
      return { ...state, buildList: action.payload };
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

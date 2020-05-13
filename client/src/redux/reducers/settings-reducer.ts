import {
  GET_CONFIG,
  LOADING,
  CLONING,
  ERROR_CLONING,
  ISCONFIG,
} from '../actions/settings-actions';

export type Config = {
  repoName: string,
  buildCommand: string,
  mainBranch: string,
  period: number,
}

export type IsConfig = boolean;
export type IsLoading = boolean;
export type IsCloning = boolean;
export type CloningWithError = boolean;

interface InitialState {
  config: Config;
  isConfig: IsConfig;
  isLoading: IsLoading;
  isCloning: IsCloning;
  cloningWithError: CloningWithError
}

const initialState: InitialState = {
  config: {
    repoName: '',
    buildCommand: '',
    mainBranch: '',
    period: 0,
  },
  isConfig: false,
  isLoading: false,
  isCloning: false,
  cloningWithError: false,
};

enum actionType {
  GET_CONFIG = 'GET_CONFIG',
  LOADING = 'LOADING',
  CLONING = 'CLONING',
  ISCONFIG = 'ISCONFIG',
  ERROR_CLONING = 'ERROR_CLONING'
}

interface settingsAction<T, D> {
    type: T;
    payload: D;
}

export function settingsReducer(state = initialState, action: settingsAction<actionType, InitialState>) {
  switch (action.type) {
    case GET_CONFIG:
      return { ...state, config: action.payload };
    case LOADING:
      return { ...state, isLoading: action.payload };
    case CLONING:
      return { ...state, isCloning: action.payload };
    case ISCONFIG:
      return { ...state, isConfig: action.payload };
    case ERROR_CLONING:
      return { ...state, cloningWithError: action.payload };
    default:
      return state;
  }
}

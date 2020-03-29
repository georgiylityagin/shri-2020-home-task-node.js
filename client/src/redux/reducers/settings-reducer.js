import { GET_CONFIG, LOADING, CLONING, ERROR_CLONING, ISCONFIG } from '../actions/settings-actions';

const initialState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
  isConfig: true,
  isLoading: false,
  isCloning: false,
  cloningWithError: false,
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIG:
      return { ...state, ...action.payload };
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

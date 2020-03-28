import { api } from '../../requests-helper/requests-helper';
import { GET_CONFIG, LOADING, CLONING, ERROR_CLONING, addConfig, loadSettings, cloningRepo, errorWithCloning } from './settings-actions';

const initialState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
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
    case ERROR_CLONING:
      return { ...state, cloningWithError: action.payload };
    default:
      return state;
  }
}

export const getConfigThunk = (history) => (dispatch) => {
  dispatch(loadSettings(true));

  api.getConfig()
    .then(response => {
      if (response.data) {
        history.push('/history');
        dispatch(loadSettings(false));
        dispatch(addConfig(response.data));
      } else {
        history.push('/');
        dispatch(loadSettings(false));
      }
    })
    .catch(err => console.log(err));
}

export const postConfig = (data, history) => (dispatch) => {
  dispatch(cloningRepo(true));

  api.postConfig(data)
    .then(res => {
      console.log(res)
      if (!res.data) {
        dispatch(errorWithCloning(true));
        dispatch(cloningRepo(false));
      } else {
        dispatch(cloningRepo(false));
        history.push('/history');
      }
    })
    .catch(err => {
      dispatch(cloningRepo(false));
      dispatch(errorWithCloning(true));
      console.log(err);
    });
}
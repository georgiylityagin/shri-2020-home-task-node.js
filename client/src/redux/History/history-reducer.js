import { api } from '../../requests-helper/requests-helper';
import { GET_BUILD_LIST, LOAD_TOGGLE, GET_REPONAME, RUN_NEW_BUILD, actionGetBuilds, loading, getRepoName, addBuildInQueue } from './history-actions';

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

export const getBuildListThunk = (limit) => (dispatch) => {
  dispatch(loading(true));

  api.getBuildsList(0, limit)
    .then(res => {
      dispatch(actionGetBuilds(res.data));
      dispatch(loading(false));
    })
    .catch(err => console.log(err));

 
  api.getConfig()
    .then(res => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch(err => console.log(err));
}

export const postNewBuildQueue = (data, history) => (dispatch) => {
  dispatch(addBuildInQueue(true));

  api.postAddBuild(data)
    .then(res => {
      history.push(`/build/${res.data.id}`);
      dispatch(addBuildInQueue(false));
    })
    .catch(err => {
      dispatch(addBuildInQueue(false));
      console.log(err);
    });
}
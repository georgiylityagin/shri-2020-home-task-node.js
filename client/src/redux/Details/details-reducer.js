import { api } from '../../requests-helper/requests-helper';
import { LOAD_TOGGLE, GET_BUILD_INFO, GET_REPONAME, GET_REBUILD_INFO, GET_LOGS, loading, getInfo, getRepoName, getRebuildInfo, getLogs } from './details-actions';

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

export const getBuildDetails = (buildId, history) => (dispatch) => {
  dispatch(loading(true));

  api.getBuildDetails(buildId)
    .then(res => {
      dispatch(getInfo(res.data));
      if (res.data.status === 'Success') {
        return api.getBuildLogs(res.data.id)
          .then(res => {
            dispatch(getLogs(res.data));
            dispatch(loading(false));
          })
          .catch(err => console.log(err));
      }
      dispatch(loading(false));
    })
    .catch(err => {
      dispatch(loading(false));
    });

  api.getConfig()
    .then(res => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        history.push('/history');
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch(err => console.log(err));
}

export const postBuildInQueue = (data, history) => (dispatch) => {
  dispatch(loading(true));

  api.postAddBuild(data)
    .then(res => {
      dispatch(getRebuildInfo(res.data));
      history.push(`${res.data.id}`);
      dispatch(loading(false));
    })
    .catch(err => {
      console.log(err)
      dispatch(loading(false));
    });
}
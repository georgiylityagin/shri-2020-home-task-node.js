import { api } from '../../requests-helper/requests-helper';

/*
 * action types
 */

export const LOAD_TOGGLE = 'LOAD_TOGGLE';

export const GET_BUILD_INFO = 'GET_BUILD_INFO';

export const GET_REPONAME = 'GET_REPONAME';

export const GET_REBUILD_INFO = 'GET_REBUILD_INFO';

export const GET_LOGS = 'GET_LOGS';

/*
 * action creators
 */

export const loading = (data) => ({
  type: LOAD_TOGGLE,
  payload: data,
});

export const getInfo = (data) => ({
  type: GET_BUILD_INFO,
  payload: data,
});

export const getRepoName = (data) => ({
  type: GET_REPONAME,
  payload: data,
});

export const getRebuildInfo = (data) => ({
  type: GET_REBUILD_INFO,
  payload: data,
});

export const getLogs = (data) => ({
  type: GET_LOGS,
  payload: data,
});

export const getBuildDetails = (buildId, history) => (dispatch) => {
  api.getBuildDetails(buildId)
    .then((res) => {
      if (res.data) {
        dispatch(getInfo(res.data));

        return api.getBuildLogs(res.data.id)
          .then((res) => {
            dispatch(getLogs(res.data));
          })
          .catch((error) => console.error(error));
      } else if (res.error) {
        res.message ? 
        console.error(res.message) :
        console.error(res.error.message);

        dispatch(getInfo({}));
      }
    })
    .catch((error) => {
      console.error(error);
    });

  api.getConfig()
    .then((res) => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        history.push('/history');
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch((error) => console.error(error));
};

export const postBuildInQueue = (data, history) => (dispatch) => {
  dispatch(loading(true));

  api.postAddBuild(data)
    .then((res) => {
      if (res.data) {
        dispatch(getRebuildInfo(res.data));
        history.push(`${res.data.id}`);
      } else if (res.error) {
        console.error(res.message);
      }
      dispatch(loading(false));
    })
    .catch((error) => {
      console.error(error);
      dispatch(loading(false));
    });
};

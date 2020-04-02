import { api } from '../../requests-helper/requests-helper';

/*
 * action types
 */

export const GET_BUILD_LIST = 'GET_BUILD_LIST';

export const LOAD_TOGGLE = 'LOAD_TOGGLE';

export const GET_REPONAME = 'GET_REPONAME';

export const RUN_NEW_BUILD = 'RUN_NEW_BUILD';

/*
 * action creators
 */
export const actionGetBuilds = (data) => ({
  type: GET_BUILD_LIST,
  payload: data,
});

export const loading = (data) => ({
  type: LOAD_TOGGLE,
  payload: data,
});

export const getRepoName = (data) => ({
  type: GET_REPONAME,
  payload: data,
});

export const addBuildInQueue = (status) => ({
  type: RUN_NEW_BUILD,
  payload: status,
});

export const getBuildsList = () => (dispatch) => {
  api
    .getBuildsList()
    .then((res) => {
      if (res.data) {
        dispatch(actionGetBuilds(res.data));
      } else if (res.error) {
        console.error(res.message)
      }
    })
    .catch((error) => console.error(error));

  api
    .getConfig()
    .then((res) => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch((error) => console.error(error));
};

export const postNewBuildQueue = (data, history) => (dispatch) => {
  dispatch(addBuildInQueue(true));

  api
    .postAddBuild(data)
    .then((res) => {
      if (res.data) {
        history.push(`/build/${res.data.id}`);
      } else if (res.error) {
        console.error(res.message);
      }
      dispatch(addBuildInQueue(false));
    })
    .catch((error) => {
      dispatch(addBuildInQueue(false));
      console.error(error);
    });
};

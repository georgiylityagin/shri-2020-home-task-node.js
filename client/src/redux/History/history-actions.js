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
  payload: data
});

export const loading = (data) => ({
  type: LOAD_TOGGLE,
  payload: data
});

export const getRepoName = (data) => ({
  type: GET_REPONAME,
  payload: data
});

export const addBuildInQueue = (status) => ({
  type: RUN_NEW_BUILD,
  payload: status
});
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
  payload: data
});

export const getInfo = (data) => ({
  type: GET_BUILD_INFO,
  payload: data
});

export const getRepoName = (data) => ({
  type: GET_REPONAME,
  payload: data
});

export const getRebuildInfo = (data) => ({
  type: GET_REBUILD_INFO,
  payload: data
});

export const getLogs = (data) => ({
  type: GET_LOGS,
  payload: data
});
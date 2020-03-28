/*
 * action types
*/
export const GET_CONFIG = 'GET_CONFIG';

export const LOADING = 'LOADING';

export const CLONING = 'CLONING';

export const ERROR_CLONING = 'ERROR_CLONING';


/*
 * action creators
*/
export const addConfig = (config) => ({
  type: GET_CONFIG,
  payload: config
});

export const loadSettings = (status) => ({
  type: LOADING,
  payload: status
});

export const cloningRepo = (status) => ({
  type: CLONING,
  payload: status
});

export const errorWithCloning = (status) => ({
  type: ERROR_CLONING,
  payload: status
});
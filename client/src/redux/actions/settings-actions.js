import { api } from '../../requests-helper/requests-helper';

/*
 * action types
 */

export const GET_CONFIG = 'GET_CONFIG';

export const LOADING = 'LOADING';

export const CLONING = 'CLONING';

export const ISCONFIG = 'ISCONFIG';

export const ERROR_CLONING = 'ERROR_CLONING';

/*
 * action creators
 */
export const addConfig = (config) => ({
  type: GET_CONFIG,
  payload: config,
});

export const loadSettings = (status) => ({
  type: LOADING,
  payload: status,
});

export const cloningRepo = (status) => ({
  type: CLONING,
  payload: status,
});

export const isConfig = (status) => ({
  type: ISCONFIG,
  payload: status,
});

export const errorWithCloning = (status) => ({
  type: ERROR_CLONING,
  payload: status,
});

export const getConfig = (history) => (dispatch) => {
  dispatch(loadSettings(true));

  api
    .getConfig()
    .then((response) => {
      if (response.data) {
        history.push('/history');
        dispatch(isConfig(true));
        dispatch(loadSettings(false));
        dispatch(addConfig(response.data));
      } else {
        history.push('/');
        dispatch(isConfig(false));
        dispatch(loadSettings(false));
      }
    })
    .catch((err) => console.log(err));
};

export const postConfig = (data, history) => (dispatch) => {
  dispatch(cloningRepo(true));

  api
    .postConfig(data)
    .then((res) => {
      console.log(res);
      if (!res.data && res.reason === 'repoCloningErr') {
        dispatch(errorWithCloning(true));
        dispatch(cloningRepo(false));
      } else {
        dispatch(cloningRepo(false));
        history.push('/history');
      }
    })
    .catch((err) => {
      dispatch(cloningRepo(false));
      dispatch(errorWithCloning(true));
      console.log(err);
    });
};

export const switchErrorWithCloning = (data) => (dispatch) => {
  dispatch(errorWithCloning(data));
};

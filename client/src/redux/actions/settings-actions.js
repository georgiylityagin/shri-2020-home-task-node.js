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


export const getConfig = () => (dispatch) => {
  dispatch(loadSettings(true));

  api
    .getConfig()
    .then((response) => {
      if (response.data) {
        dispatch(isConfig(true));
        dispatch(addConfig({
          repoName: response.data.repoName,
          buildCommand: response.data.buildCommand,
          mainBranch: response.data.mainBranch,
          period: response.data.period,
        }));
      } else if (response.error) {
        response.message ? 
        console.error(response.message) :
        console.error(response.error.message);
        
        dispatch(isConfig(false));
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(isConfig(false));
    })
    .finally(() => {
      dispatch(loadSettings(false));
    });
};

export const postConfig = (data, history) => (dispatch) => {
  dispatch(cloningRepo(true));

  api
    .postConfig(data)
    .then((response) => {
      if (response.result === 'success') {
        dispatch(cloningRepo(false));
        history.push('/');
      } else if (response.error) {
        response.message ? 
        console.error(response.message) :
        console.error(response.error.message);

        dispatch(cloningRepo(false));
        dispatch(errorWithCloning(true));
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(cloningRepo(false));
      dispatch(errorWithCloning(true));
    });
};

export const switchErrorWithCloning = (data) => (dispatch) => {
  dispatch(errorWithCloning(data));
};

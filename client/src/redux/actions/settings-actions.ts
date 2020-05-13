import { api } from '../../requests-helper/requests-helper';
import { Config, IsConfig, IsLoading, IsCloning, CloningWithError } from '../reducers/settings-reducer';
import { Dispatch } from 'redux';
import { History } from 'history'

/*
 * action types
 */

export const GET_CONFIG = 'GET_CONFIG';
export const LOADING = 'LOADING';
export const CLONING = 'CLONING';
export const ISCONFIG = 'ISCONFIG';
export const ERROR_CLONING = 'ERROR_CLONING';

interface addConfig {
  type: 'GET_CONFIG',
  payload: Config
}

interface loadSettings {
  type: 'LOADING',
  payload: IsLoading
}

interface cloningRepo {
  type: 'CLONING',
  payload: IsCloning

}
interface isConfig {
  type: 'ISCONFIG',
  payload: IsConfig
}

interface errorWithCloning {
  type: 'ERROR_CLONING',
  payload: CloningWithError
}

export type settingsActionTypes = addConfig | loadSettings | cloningRepo | isConfig | errorWithCloning;

/*
 * action creators
 */
export const addConfig = (config: Config): settingsActionTypes => ({
  type: GET_CONFIG,
  payload: config,
});

export const loadSettings = (status: IsLoading): settingsActionTypes => ({
  type: LOADING,
  payload: status,
});

export const cloningRepo = (status: IsCloning): settingsActionTypes => ({
  type: CLONING,
  payload: status,
});

export const isConfig = (status: IsConfig): settingsActionTypes => ({
  type: ISCONFIG,
  payload: status,
});

export const errorWithCloning = (status: CloningWithError): settingsActionTypes => ({
  type: ERROR_CLONING,
  payload: status,
});


export const getConfig = () => (dispatch: Dispatch<settingsActionTypes>) => {
  dispatch(loadSettings(true));

  api
    .getConfig()
    .then((response: any) => {
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

export const postConfig = (data: Config, history: History) => (dispatch: Dispatch<settingsActionTypes>) => {
  dispatch(cloningRepo(true));

  api
    .postConfig(data)
    .then((response: any) => {
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

export const switchErrorWithCloning = (data: CloningWithError) => (dispatch: Dispatch<settingsActionTypes>) => {
  dispatch(errorWithCloning(data));
};

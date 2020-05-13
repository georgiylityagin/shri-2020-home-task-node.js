import { api } from '../../requests-helper/requests-helper';
import { isLoading, repoName, logs, buildInfo, rebuildInfo } from '../reducers/details-reducer';
import { Dispatch } from 'redux';
import { History } from 'history';

/*
 * action types
 */

export const LOAD_TOGGLE = 'LOAD_TOGGLE';

export const GET_BUILD_INFO = 'GET_BUILD_INFO';

export const GET_REPONAME = 'GET_REPONAME';

export const GET_REBUILD_INFO = 'GET_REBUILD_INFO';

export const GET_LOGS = 'GET_LOGS';

interface loading {
  type: 'LOAD_TOGGLE',
  payload: isLoading
}

interface getInfo {
  type: 'GET_BUILD_INFO',
  payload: buildInfo
}

interface getRepoName {
  type: 'GET_REPONAME',
  payload: repoName

}
interface getRebuildInfo {
  type: 'GET_REBUILD_INFO',
  payload: rebuildInfo
}

interface getLogs {
  type: 'GET_LOGS',
  payload: logs
}

export type detailsActionTypes = loading | getInfo | getRepoName | getRebuildInfo | getLogs;

/*
 * action creators
 */

export const loading = (data: isLoading): detailsActionTypes => ({
  type: LOAD_TOGGLE,
  payload: data,
});

export const getInfo = (data: buildInfo): detailsActionTypes => ({
  type: GET_BUILD_INFO,
  payload: data,
});

export const getRepoName = (data: repoName): detailsActionTypes => ({
  type: GET_REPONAME,
  payload: data,
});

export const getRebuildInfo = (data: rebuildInfo): detailsActionTypes => ({
  type: GET_REBUILD_INFO,
  payload: data,
});

export const getLogs = (data: logs): detailsActionTypes => ({
  type: GET_LOGS,
  payload: data,
});

export const getBuildDetails = (buildId: string, history: History) => (dispatch: Dispatch<detailsActionTypes>) => {
  api.getBuildDetails(buildId)
    .then((res: any) => {
      if (res.data) {
        dispatch(getInfo(res.data));

        return api.getBuildLogs(res.data.id)
          .then((res: any) => {
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
    .then((res: any) => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        history.push('/history');
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch((error) => console.error(error));
};

export const postBuildInQueue = (data: string, history: History) => (dispatch: Dispatch<detailsActionTypes>) => {
  dispatch(loading(true));

  api.postAddBuild(data)
    .then((res: any) => {
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

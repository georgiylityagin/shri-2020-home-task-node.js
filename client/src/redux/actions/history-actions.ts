import { api } from '../../requests-helper/requests-helper';
import { IsLoading, RepoName, RunNewBuild, BuildListType } from '../reducers/history-reducer';
import { Dispatch } from 'redux';
import { History } from 'history'

/*
 * action types
 */

export const GET_BUILD_LIST = 'GET_BUILD_LIST';
export const LOAD_TOGGLE = 'LOAD_TOGGLE';
export const GET_REPONAME = 'GET_REPONAME';
export const RUN_NEW_BUILD = 'RUN_NEW_BUILD';

interface actionGetBuilds {
  type: 'GET_BUILD_LIST',
  payload: BuildListType
}

interface loading {
  type: 'LOAD_TOGGLE',
  payload: IsLoading
}

interface getRepoName {
  type: 'GET_REPONAME',
  payload: RepoName

}
interface addBuildInQueue {
  type: 'RUN_NEW_BUILD',
  payload: RunNewBuild
}

export type historyActionTypes = actionGetBuilds | loading | getRepoName | addBuildInQueue;

/*
 * action creators
 */
export const actionGetBuilds = (data: BuildListType): historyActionTypes => ({
  type: GET_BUILD_LIST,
  payload: data,
});

export const loading = (data: IsLoading): historyActionTypes => ({
  type: LOAD_TOGGLE,
  payload: data,
});

export const getRepoName = (data: RepoName): historyActionTypes => ({
  type: GET_REPONAME,
  payload: data,
});

export const addBuildInQueue = (status: RunNewBuild): historyActionTypes => ({
  type: RUN_NEW_BUILD,
  payload: status,
});

export const getBuildsList = () => (dispatch: Dispatch<historyActionTypes>) => {
  api
    .getBuildsList()
    .then((res: any) => {
      if (res.data) {
        dispatch(actionGetBuilds(res.data));
      } else if (res.error) {
        res.message ? 
        console.error(res.message) :
        console.error(res.error.message);
      }
    })
    .catch((error) => console.error(error));

  api
    .getConfig()
    .then((res: any) => {
      if (res.data) {
        dispatch(getRepoName(res.data.repoName));
      } else {
        dispatch(getRepoName('No settings in the config'));
      }
    })
    .catch((error) => console.error(error));
};

export const postNewBuildQueue = (data: string, history: History) => (dispatch: Dispatch<historyActionTypes>) => {
  dispatch(addBuildInQueue(true));

  api
    .postAddBuild(data)
    .then((res: any) => {
      if (res.data) {
        history.push(`/build/${res.data.id}`);
      } else if (res.error) {
        res.message ? 
        console.error(res.message) :
        console.error(res.error.message);
      }
      dispatch(addBuildInQueue(false));
    })
    .catch((error) => {
      dispatch(addBuildInQueue(false));
      console.error(error);
    });
};

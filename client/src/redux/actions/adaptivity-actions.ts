import { Dispatch } from "redux";

export const breakpoint = 767;

/*
 * action types
 */

export const RESIZE = 'RESIZE';

export const ISMOBILE = 'ISMOBILE';


interface resizeWindow {
  type: 'RESIZE',
  payload: number
}

interface isMobile {
  type: 'ISMOBILE',
  payload: boolean
}

export type adaptivityActionTypes = resizeWindow | isMobile;

/*
 * action creators
 */

export const resizeWindow = (width: number): adaptivityActionTypes => ({
  type: RESIZE,
  payload: width,
});

export const isMobile = (status: boolean): adaptivityActionTypes => ({
  type: ISMOBILE,
  payload: status,
});

export const detectDevice = (width: number) => (dispatch: Dispatch<adaptivityActionTypes>) => {
  dispatch(resizeWindow(width));

  if (width <= breakpoint) {
    dispatch(isMobile(true));
  } else {
    dispatch(isMobile(false));
  }
};

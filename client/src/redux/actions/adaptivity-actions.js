export const breakpoint = 767;

/*
 * action types
*/

export const RESIZE = 'RESIZE';

export const ISMOBILE = 'ISMOBILE';


/*
 * action creators
*/

export const resizeWindow = (width) => ({
  type: RESIZE,
  payload: width
})

export const isMobile = (status) => ({
  type: ISMOBILE,
  payload: status
})

export const detectDevice = (width) => (dispatch) => {
  dispatch(resizeWindow(width));

  if (width <= breakpoint) {
    dispatch(isMobile(true))
  } else {
    dispatch(isMobile(false))
  }
}
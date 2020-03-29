import { RESIZE, ISMOBILE, breakpoint } from '../actions/adaptivity-actions';

const initialState = {
  width: window.innerWidth,
  isMobile: window.innerWidth <= breakpoint
};

export const adaptivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE:
      return { ...state, width: action.payload };
    case ISMOBILE:
      return { ...state, isMobile: action.payload }
    default:
      return state;
  }
};

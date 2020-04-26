import { breakpoint } from '../actions/adaptivity-actions';

const initialState = {
  width: window.innerWidth,
  isMobile: window.innerWidth <= breakpoint,
};

enum actionType {
  RESIZE = 'RESIZE',
  ISMOBILE = 'ISMOBILE'
}

interface adaptivityPayload {
  width: number;
  isMobile: boolean;
}

interface adaptivityAction<T, D> {
  type: T;
  payload: D;
}


export const adaptivityReducer = (state = initialState, action: adaptivityAction<actionType, adaptivityPayload>) => {
  switch (action.type) {
    case actionType.RESIZE:
      return { ...state, width: action.payload };
    case actionType.ISMOBILE:
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};

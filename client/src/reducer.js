const defaultState = {
  ui: {
    width: window.innerWidth
  }
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "RESIZE":
      return {
        ui: {
          width: window.innerWidth
        }
      };
    default:
      return state;
  }
};

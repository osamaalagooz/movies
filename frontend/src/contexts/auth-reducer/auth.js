import { LOGIN, LOGOUT, SET_USER } from "./actions";

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
      };
    }
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;

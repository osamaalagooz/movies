import React, { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

// Reducer and actions for state management
import { LOGIN, LOGOUT, SET_USER } from "./auth-reducer/actions";
import authReducer from "./auth-reducer/auth";

// Project imports
import axios from "../utils/axios";
import Spinner from "../components/spinner/Spinner";

// Initial state
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// Utility function to verify token validity
const verifyToken = (token) => {
  if (!token) return false;

  const decoded = jwtDecode(token);
  return decoded.exp > Date.now() / 1000;
};

// Utility function to set session
const setSession = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common.Authorization;
  }
};

// JWT Context & Provider
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && verifyToken(token)) {
          const user = JSON.parse(localStorage.getItem("user"));
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          setSession(null);
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        console.error("Initialization error:", error);
        dispatch({ type: LOGOUT });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("api/auth/login", { email, password });
      const user = response?.data?.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setSession(user.token);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user,
          },
        });
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      await axios.post("api/auth/register", formData);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  if (!state.isInitialized) {
    return <Spinner />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, register, setUser, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;

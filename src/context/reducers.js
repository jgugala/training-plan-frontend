import React, { useReducer } from 'react'

export const combineReducers = reducers => (state, action) => {
  return Object.keys(reducers).reduce(
    (acc, prop) => ({
      ...acc,
      ...reducers[prop](acc, action)
    }),
    state
  );
}

// Auth actions
export const LOGIN_SUCCESS = "LOGIN_SCUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SCUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_USER_LOADING = "GET_USER_LOADING";
  
// Auth initial state
export const initialAuthState = {
	user: null,
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: false,
}

// Auth reducer
export const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case GET_USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    default:
      return state;
  }
}

// Error actions
export const GET_ERRORS = "GET_ERRORS";

export const handleErrors = (err, dispatch) => {
  const errors = {
    msg: err.response.data,
    status: err.response.status
  }
  dispatch({
    type: GET_ERRORS,
    payload: errors
  });
}

// Error initial state
export const initialErrorState = {
  errorMsg: {},
  errorStatus: null
}

// Error Reducer
export const ErrorReducer = (state = initialErrorState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        errorMsg: action.payload.msg,
        errorStatus: action.payload.status
      }
    default:
      return state;
  }
}

// Message actions
export const GET_MESSAGE = "GET_MESSAGE";
export const CREATE_MESSAGE = "CREATE_MESSAGE";

export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  }
}

// Message initial state
export const initialMessageState = {}

// Message Reducer
export const MessageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return action.payload
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
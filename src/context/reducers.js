import React, { useReducer } from 'react'

export const LOGIN_SUCCESS = "LOGIN_SCUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SCUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_USER_LOADING = "GET_USER_LOADING";

const LOGOUT = "LOGOUT";
const USER_LOGIN = "USER_LOGIN";
const USER_LOGED = "USER_LOGED";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
const USER_LOGOUT = "USER_LOGOUT";

const token = localStorage.getItem("token") 
  ? localStorage.getItem("token") : null;


export const initialState = {
	user: null,
	token: token,
	isAuthenticated: false,
	isLoading: false,
}

export const AuthReducer = (state = initialState, action) => {
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
      debugger;
      return {
        ...state,
        isLoading: true
      }
    case GET_USER_SUCCESS:
      debugger;
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
  }
}
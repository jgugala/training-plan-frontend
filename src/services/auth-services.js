import axios from 'axios';
import { client, provideAuthHeader } from './http-client-config';
import { 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_LOADING,
  GET_ERRORS,
  handleErrors
} from '../context/reducers';

const LOGIN = "login/";
const LOGOUT = "logout/";
const REGISTER = "register/";
const GET_USER = "user/";

// LOGIN USER
export const login = (username, password, dispatch) => {
  // Request body
  const body = JSON.stringify({username, password});

  console.log("authServices > login called...");

  client
    .post(LOGIN, body)
    .then(res => {
      console.log("authServices > login > response =", res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("authServices > login > error =", err);
      dispatch({
        type: LOGIN_FAILURE
      });
      handleErrors(err, dispatch);
    });
}

// LOGOUT USER
export const logout = (authState, dispatch) => {
  const config = provideAuthHeader(authState);
  console.log("config", config);

  console.log("authServices > logout called...");

  client
    .post(LOGOUT, null, config)
    .then(res =>{
      console.log("authServices > logout > response =", res);
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      console.log("authServices > logout > error =", err);
    });
}

// REGISTER USER
export const register = ({username, password, email}, dispatch) => {
  // Request body
  const body = JSON.stringify({username, password, email});

  console.log("authServices > register called...");

  client
    .post(REGISTER, body)
    .then(res =>{
      console.log("authServices > register > response =", res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("authServices > register > error =", err);
      dispatch({
        type: REGISTER_FAILURE
      });
      handleErrors(err, dispatch);
    });
}

// GET USER
export const getUser = (authState, dispatch) => {
  // User loading
  dispatch({ type: GET_USER_LOADING });

  const config = provideAuthHeader(authState);

  console.log("authServices > getUser called...");

  client
    .get(GET_USER, config)
    .then(res =>{
      console.log("authServices > getUser > response =", res);
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("authServices > getUser > error =", err);
      dispatch({
        type: GET_USER_FAILURE
      });
    });
}
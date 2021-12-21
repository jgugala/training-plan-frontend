import React from 'react'
import {
  combineReducers,
  initialAuthState, initialErrorState, initialMessageState,
  AuthReducer, ErrorReducer, MessageReducer
} from './reducers';

// Auth context
const AuthState = React.createContext();

export const useAuthState = () => {
  const context = React.useContext(AuthState);
  if (context == undefined) {
  	throw new Error("useAuthState must be used within AuthProvider");
  }

  return context;
}


export const AuthProvider = props => {
  const combined = combineReducers({AuthReducer, ErrorReducer});

  const [authState, dispatch] = React.useReducer(combined, initialAuthState)

  return (
    <AuthState.Provider 
      value={{
        authState, dispatch
      }}
    >
      {props.children}
    </AuthState.Provider>
  );
}

// Message context
const MessageContext = React.createContext();

export const useMessage = () => {
  const context = React.useContext(MessageContext);
  if (context == undefined) {
    throw new Error("useMessage must be used within MessageProvider");
  }

  return context;
}


export const MessageProvider = props => {
  const [message, messageDispatch] = 
    React.useReducer(MessageReducer, initialMessageState)

  return (
    <MessageContext.Provider 
      value={{
        message, messageDispatch
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}
import React from 'react'
import { initialState, AuthReducer } from './reducers';

const AuthState = React.createContext();

export const useAuthState = () => {
  const context = React.useContext(AuthState);
  if (context == undefined) {
  	throw new Error("useAuthState must be used within AuthProvider");
  }

  return context;
}


const AuthProvider = props => {
  const [authState, dispatch] = React.useReducer(AuthReducer, initialState)

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

export default AuthProvider;
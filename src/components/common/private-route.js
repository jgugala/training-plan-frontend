import React from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthState } from '../../context';

const PrivateRoute = props => {
  const { authState } = useAuthState();

  return (
    authState.isLoading ? <h3>Loading...</h3> :
      !authState.token  ? <Navigate to="/login" /> : props.children
  );
}

export default PrivateRoute;
import React, { Fragment, useEffect } from 'react';
import logo from 'assets/images/logo.svg';
import './App.scss';
import { HashRouter as Router, Route, Routes, Redirect } from 'react-router-dom'
import Header from '../layout/header';
import Dashboard from '../../pages/dashboard';
import Register from '../accounts/register';
import Login from '../accounts/login';
import PrivateRoute from '../common/private-route';
import NotFound from '../common/not-found';
import AuthProvider from '../../context/';
import { useAuthState } from '../../context';
import { getUser } from '../../services/auth-services';

function App() {
  const { authState, dispatch } = useAuthState();
  debugger;
  
  useEffect(() => {
    debugger;
    getUser(authState, dispatch);
  }, [])

  return (
    <Router>
      <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

export const AppWrapper = props => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}


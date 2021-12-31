import React, { useEffect } from 'react';
import logo from 'assets/images/logo.svg';
import './App.scss';
import { HashRouter as Router, Route, Routes, Redirect } from 'react-router-dom'
import Navbar from '../common/navbar';
import Dashboard from '../../pages/dashboard';
import Register from '../accounts/register';
import Login from '../accounts/login';
import PrivateRoute from '../common/private-route';
import NotFound from '../common/not-found';
import { AuthProvider, MessageProvider } from '../../context/';
import { useAuthState } from '../../context';
import { getUser } from '../../services/auth-services';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from '../common/alerts';

// Alert options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

function App() {
  const { authState, dispatch } = useAuthState();
  
  useEffect(() => {
    getUser(authState, dispatch);
  }, [])

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <Navbar />
        <Alerts />
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
    </AlertProvider>
  );
}

export default App;

export const AppWrapper = props => {
  return (
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  );
}


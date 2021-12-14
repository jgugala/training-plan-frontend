import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../context';
import { logout } from '../../services/auth-services';

// TODO: move it to the 'common' dir and rename to Navbar
const Header = props => {
  const {authState, dispatch} = useAuthState();

  const { isAuthenticated, user } = authState;

  const logoutUser = () => {
    logout(authState, dispatch);
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <span className="navbar-text mr-3">
          {user ? `Welcome ${user.username}` : ""}
        </span>
      </li>
      <li className="nav-item">
        <button className="nav-link btn btn-info btn-sm text-light"
          onClick={logoutUser}>
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );

  return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Training Plan
            </a>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
	);
}
export default Header;
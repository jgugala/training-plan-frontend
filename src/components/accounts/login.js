import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../context';
import { login } from '../../services/auth-services';
import { Navigate } from 'react-router-dom';

const Login = props => {
  const { authState, dispatch } = useAuthState();
  debugger;
  const initialState = {
  	username: '',
  	password: ''
  };

  const [credentials, setCredentials] = React.useState(initialState)

  const { username, password } = credentials;

  const onSubmit = e => {
    e.preventDefault();
    login(credentials.username, credentials.password, dispatch);
  };

  const onChange = e => {
  	setCredentials({
      ...credentials,
      [e.target.name]: e.target.value  		
  	});
  };


  debugger;
	return (
    authState.isAuthenticated ? <Navigate to="/" /> :
	  <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
	);
}

export default Login;
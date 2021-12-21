import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useMessage } from '../../context';
import { register } from '../../services/auth-services';
import { Navigate } from 'react-router-dom';
import { createMessage } from '../../context/reducers';

const Register = props => {
  const { authState, dispatch } = useAuthState();

  const { messageDispatch } = useMessage();
  
  const initialState = {
    username: '',
  	email: '',
  	password: '',
  	password2: ''
  }

  const [registerdData, setRegisterdData] = React.useState(initialState)

  const { username, email, password, password2 } = registerdData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      messageDispatch(
        createMessage({ passwordNotMatch: "Passwords do not match" })
      );
    } else {
      const newUser = {
        username,
        password,
        email
      }
      register(newUser, dispatch);
    }
  }

  const onChange = (e) => {
    setRegisterdData({
      ...registerdData,
      [e.target.name]: e.target.value     
    });
  }

	return (
    authState.isAuthenticated ? <Navigate to="/" /> :
	  <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={onChange}
                value={email}
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={onChange}
                value={password2}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
	);
}

export default Register;
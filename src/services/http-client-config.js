import axios from 'axios';
import { useAuthState } from '../context';

export const client = axios.create({
	baseURL: 'http://127.0.0.1:8000/training-plan/api/',
	headers: {
      "Content-Type" : "application/json"
    },
	/* other custom settings */
});


export const provideAuthHeader = (authState) => {
	// Get token from state
	const token = authState.token;

	// Headers config
	const config = {
	  headers: {
	  }
	};
	
	// If token is not null, add to headers config
	if (token) {
	  config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
}

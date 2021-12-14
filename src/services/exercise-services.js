import axios from 'axios';
import { client } from './http-client-config';

const GET_EXERCISES = 'exercises/';

export default function getExercises() {
	console.log("exerciseServices > getExercises called...");

	return client.get(GET_EXERCISES);
}
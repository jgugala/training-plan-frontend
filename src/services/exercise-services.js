import axios from 'axios';
import { client, provideAuthHeader } from './http-client-config';

const GET_EXERCISES = 'exercises/';

export default function getExercises(authState) {
  console.log("exerciseServices > getExercises called...");

  const config = provideAuthHeader(authState);

  return client.get(GET_EXERCISES, config);
}
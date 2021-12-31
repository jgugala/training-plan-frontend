import axios from 'axios';
import { client, provideAuthHeader } from './http-client-config';

const GET_EXERCISES = 'trainings/';

export default function getTrainingsAndExercises(authState) {
  console.log("exerciseServices > getTrainingsAndExercises called...");

  const config = provideAuthHeader(authState);


  // Add hoc solution for temporary usage. 
  // Probably it could be done better by returning the promise object or
  // using async/await mechanism.
  // UPDATE: Ore event better by something like that: https://bit.ly/3pnJpJk
  let trainingsResponse;
  return client
    .get(GET_EXERCISES, config)
    .then(res => {
      trainingsResponse = res;
	  return client.get('exercises/', config);
    })
    .then(exercisesResponse => {
  	  return {
        trainings: trainingsResponse.data,
  	    exercises: exercisesResponse.data
  	  }
    });
}
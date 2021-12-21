import React, { useEffect } from 'react';
import getExercises from 'services';
import ExercisesList from 'components/exercises-list';
import { useAuthState } from '../../context';

// Class componenet example (lifecycle methods)
const Dashboard = props => {
  const { authState, dispatch } = useAuthState();

  const [exercises, setExercises] = React.useState([]);

  useEffect(() => {
    getExercises(authState)
      .then(response => {
        console.log("Dashboard > getExercises > response =", response);
        setExercises(response.data);
      })
      .catch(error => {
        console.log("Dashboard > getExercises > error =", error);
      }
    );
  }, [])

  return (
    <ExercisesList exercises={exercises}/>
  );
}

export default Dashboard;

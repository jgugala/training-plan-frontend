import React, { useEffect } from 'react';
import getTrainingsAndExercises from 'services';
import TrainingsList from 'components/trainings-list';
import { useAuthState } from '../../context';
import { client, provideAuthHeader } from '../../services/http-client-config';

const Dashboard = props => {
  const { authState, dispatch } = useAuthState();

  const [response, setResponse] = React.useState({});

  useEffect(() => {
    let isMounted = true;
    getTrainingsAndExercises(authState)
      .then(res => {
        console.log("Dashboard > getTrainingsAndExercises > response =", res);
        if (isMounted) {
          setResponse(res);
        }
      })
      .catch(err => {
        console.log("Dashboard > getTrainingsAndExercises > error =", err);
      });

      return () => { 
        isMounted = false 
      };
  }, [])

  return (
    <TrainingsList response={response}/>
  );
}

export default Dashboard;

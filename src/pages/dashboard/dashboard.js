import React from 'react';
import getExercises from 'services';
import ExercisesList from 'components/exercises-list';

// Class componenet example (lifecycle methods)
export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      clickCount: 0,
    };
  }

  componentDidMount() {
    getExercises()
      .then(response => {
        console.log("Dashboard > getExercises > response =", response);
        this.setState({
          exercises: response.data
        });
        console.log(this.state.exercises);
      })
      .catch(error => {
        console.log("Dashboard > getExercises > error =", error);
      });
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <ExercisesList exercises={this.state.exercises}/>
    );
  }

}
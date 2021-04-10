import React from 'react';
import PropTypes from 'prop-types';
import getExercises from 'services';
import './exercises-list.scss';

// Class componenet example
export default class ExercisesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
  }

  renderExercisesList() {
    const exercisesList = this.props.exercises.map(exercise =>
      <li key={exercise.id}>
        {exercise.name}
      </li>
    );
    
    return (
      <ul>{exercisesList}</ul>
    );
  }

  handleClick(i) {
    // do something to the button where key===i
    const clickCount = this.state.clickCount;
    
    // Do something
    this.setState({
      clickCount: clickCount + 1,
    });
  }

  render() {
    return (
      <div>
        {this.renderExercisesList()}
      </div>
    );
  }

}

ExercisesList.propTypes = {
    exercises: PropTypes.array.isRequired
};
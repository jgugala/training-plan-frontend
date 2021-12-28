import React from 'react';
import PropTypes from 'prop-types';
import './exercise-details.scss';

const ExerciseDetails = React.forwardRef((props, ref) =>
  <div ref={ref} className="collapsible-content">
    {props.exercises.map(exercise => 
	  `${exercise.name}\n`
	)}
  </div>
);

export default ExerciseDetails

ExerciseDetails.propTypes = {
    exercises: PropTypes.array.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import './exercise-details.scss';

const ExerciseDetails = React.forwardRef((props, ref) => (
	<div ref={ref} className="collapsible-content">
		{props.exercise.description}
  	</div>
));

export default ExerciseDetails

ExerciseDetails.propTypes = {
    exercise: PropTypes.object.isRequired
};

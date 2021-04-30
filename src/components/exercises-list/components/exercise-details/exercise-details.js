import React from 'react';

const ExerciseDetails = React.forwardRef((props, ref) => (
	<div ref={ref} className="collapsible-content">
		{props.exercise.description}
  	</div>
));

export default ExerciseDetails

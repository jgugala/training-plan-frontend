import React from 'react';
import PropTypes from 'prop-types';
import './training-details.scss';

const TrainingDetails = React.forwardRef((props, ref) =>
  <div ref={ref} className="collapsible-content">
    {props.exercises.map(exercise => 
      `${exercise.name}\n`
    )}
  </div>
);

export default TrainingDetails

TrainingDetails.propTypes = {
    exercises: PropTypes.array.isRequired
};

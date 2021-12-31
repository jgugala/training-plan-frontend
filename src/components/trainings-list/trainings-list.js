import React from 'react';
import PropTypes from 'prop-types';
import './trainings-list.scss';
import TrainingDetails from './components/training-details';

// Class componenet example
export default class TrainingsList extends React.Component {

  constructor(props) {
    super(props);
    this.detailsRefs = React.createRef({});
    this.detailsRefs.current = {};
    this.state = {
      isSelected: false,
      selectedId: 0,
    };
  }

  isSelected(id) {
    return this.state.selectedId == id ? !this.state.isSelected : false
  }

  addToRefs(id, el) {
    if (el && !(id in this.detailsRefs.current)) {
      this.detailsRefs.current[id] = el;
    }
  }

  handleClick(id) {
    const detailsRef = this.detailsRefs.current[id];
    const selectedId = this.state.selectedId;

    if (selectedId != 0 && id != this.state.selectedId) {
      this.detailsRefs.current[this.state.selectedId].style.maxHeight = null; 
    }
    this.detailsRefs.current[id].style.maxHeight = 
      detailsRef.style.maxHeight ? null : detailsRef.scrollHeight + 'px';
    
    this.setState({
      isSelected: this.isSelected(id),
      selectedId: id, 
    });
  }

  renderTrainingsList() {
    const trainingsList = this.props.response.trainings ? 
      this.props.response.trainings.map(training => {

        const trainingExercises = training.training_items.map(trainingItem =>
          this.props.response.exercises.find(exercise => 
            exercise.id === trainingItem.exercise_id
          )
        )

        return <li key={training.id} onClick={() => this.handleClick(training.id)} 
          aria-pressed={this.isSelected(training.id)}>

          {training.name}

          <TrainingDetails ref={el => this.addToRefs(training.id, el)} 
            exercises={trainingExercises}/>
        </li>
      }) : [];
    
    return (
      <ul>{trainingsList}</ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderTrainingsList()}
      </div>
    );
  }

}

TrainingsList.propTypes = {
    response: PropTypes.object.isRequired
};

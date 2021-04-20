import React from 'react';
import PropTypes from 'prop-types';
import getExercises from 'services';
import './exercises-list.scss';

// Class componenet example
export default class ExercisesList extends React.Component {

  constructor(props) {
    super(props);
    this.detailsRefs = React.createRef({});
    this.detailsRefs.current = {};
    this.state = {
      isCollapsed: true,
      selectedId: 0,
    };
  }

  isCollapsed(id) {
    return this.state.selectedId == id ? !this.state.isCollapsed : false
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
    this.detailsRefs.current[id].style.maxHeight = detailsRef.style.maxHeight ? null : detailsRef.scrollHeight + 'px';
    
    this.setState({
      isCollapsed: this.isCollapsed(id),
      selectedId: id, 
    });
  }

  renderExercisesList() {
    const exercisesList = this.props.exercises.map(exercise =>

      <li key={exercise.id} onClick={() => this.handleClick(exercise.id)} 
        aria-pressed={this.isCollapsed(exercise.id)}>

        {exercise.name}
        
        <div ref={el => this.addToRefs(exercise.id, el)} className='collapsible-content'>
          {exercise.description}
        </div>

      </li>
    );
    
    return (
      <ul>{exercisesList}</ul>
    );
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

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { taskText } = state;
  return { text: taskText };
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

class newTaskForm extends React.Component {
  handleAddTask = (e) => {
    e.preventDefault();
    const { text, addTask } = this.props;
    const task = { text, id: _.uniqueId() };
    addTask({task});
  };

  handleUpdateNewTaskText = (e) => {
    const { updateNewTaskText } = this.props;
    updateNewTaskText({text: e.target.value});
  };

  render() {
    const { text } = this.props;

    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            data-testid="input"
            required
            value={text}
            onChange={this.handleUpdateNewTaskText}
          />
        </div>
        <input type="submit" data-testid="submit" value="Add" className="btn btn-primary btn-sm" />
       
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(newTaskForm);

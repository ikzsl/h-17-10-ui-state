import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const mapStateToProps = ({ text }) => {
  const props = {
    text,
  };
  return props;
};

class newTaskForm extends React.Component {
  handleAddTask = (e) => {
    e.preventDefault();
    const { text, addTask } = this.props;
    const task = { text, id: _.uniqueId() };
    addTask(task);
  };

  handleUpdateNewTaskText = (e) => {
    e.preventDefault();
    const { updateNewTaskText } = this.props;
    updateNewTaskText(e.target.value);
  };

  render() {
    const { text } = this.props;

    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            required
            value={text}
            s
            onChange={this.handleUpdateNewTaskText}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Add
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, actions)(newTaskForm);

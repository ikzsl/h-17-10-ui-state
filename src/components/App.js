import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateNewTaskText, addTask, removeTask } from '../actions';

const mapStateToProps = ({ tasks, text }) => {
  const props = {
    tasks,
    text,
  };
  return props;
};

class App extends React.Component {
  handleChangeText = (e) => {
    e.preventDefault();
    const newTaskText = e.target.value;
    const { dispatch } = this.props;
    dispatch(updateNewTaskText(newTaskText));
  };

  handleAddTask = (e) => {
    e.preventDefault();
    const { dispatch, text } = this.props;
    const task = { text, id: _.uniqueId() };
    dispatch(addTask(task));
  };

  handleRemoveTask = (id) => {
    const { dispatch } = this.props;
    dispatch(removeTask(id));
  };

  render() {
    const { tasks, text } = this.props;
    console.log(tasks);
    const tasksListItems = tasks.map((task) => (
      <li className="list-group-item d-flex" key={task.id}>
        <span className="mr-auto">{task.text}</span>
        <button
          type="button"
          className="close"
          onClick={() => this.handleRemoveTask(task.id)}
        >
          <span>&times;</span>
        </button>
      </li>
    ));

    const tasksList = (
      <div className="mt-3">
        <ul className="list-group">{tasksListItems}</ul>
      </div>
    );

    return (
      <div className="col-5">
        <form action="" className="form-inline" onSubmit={this.handleAddTask}>
          <div className="form-group mx-sm-3">
            <input
              type="text"
              required
              value={text}
              onChange={this.handleChangeText}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </form>
        {tasks.length > 0 ? tasksList : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

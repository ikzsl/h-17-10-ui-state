import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { tasks } = state;
  return { tasks };
};

const actionCreators = {
  removeTask: actions.removeTask,
};

class Tasks extends React.Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(({ id, text }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{text}</span>
              <button
                type="button"
                className="close"
                onClick={this.handleRemoveTask(id)}
              >
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Tasks);

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  // BEGIN
  const { tasks: { byId, allIds }, tasksUIState } = state;
  const tasks = allIds.map(id => byId[id]);
  return { tasks, tasksUIState };
  // END
};

const actionCreators = {
  inverseTaskTheme: actions.inverseTaskTheme,
};

class Tasks extends React.Component {
  // BEGIN
  handleInverseTaskTheme = task => (e) => {
    e.preventDefault();
    const { inverseTaskTheme } = this.props;
    inverseTaskTheme({ task });
  };

  renderTask = (task) => {
    const { tasksUIState } = this.props;

    const themeToClasses = {
      dark: 'bg-dark text-light',
      light: 'bg-light text-dark',
    };


    const currentThemeClass = themeToClasses[tasksUIState[task.id].theme];

    const classes = cn({
      'list-group-item d-flex': true,
      [currentThemeClass]: true,
    });

    return (
      <li key={task.id} className={classes}>
        <span className="mr-auto">
          <a href="#" onClick={this.handleInverseTaskTheme(task)}>{task.text}</a>
        </span>
      </li>
    );
  }

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(this.renderTask)}
        </ul>
      </div>
    );
  }
  // END
}

export default connect(mapStateToProps, actionCreators)(Tasks);
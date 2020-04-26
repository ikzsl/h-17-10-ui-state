import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const taskText = handleActions(
  {
    [actions.updateNewTaskText]: (state, { payload: { text } }) => text,
    [actions.addTask]: () => '',
  },
  ''
);

const tasks = handleActions(
  {
    [actions.addTask]: (state, { payload: { task } }) => [task, ...state],
    [actions.removeTask]: (state, { payload: { id } }) =>
      state.filter((task) => task.id !== id),
  },
  []
);

export default combineReducers({ taskText, tasks });

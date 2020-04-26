import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const tasksUIState = handleActions({
  // BEGIN
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: { theme: 'light' } };
  },
  [actions.inverseTaskTheme](state, { payload: { task } }) {
    const currentTheme = state[task.id].theme;
    const mapping = {
      dark: 'light',
      light: 'dark',
    };
    return { ...state, [task.id]: { theme: mapping[currentTheme] } };
  },
  // END
}, {});

const text = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload }) {
    return payload.text;
  },
}, '');

export default combineReducers({
  tasks,
  tasksUIState,
  text,
});
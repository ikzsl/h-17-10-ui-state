import _ from 'lodash';
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
  [actions.removeTask](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  // BEGIN
  [actions.toggleTaskState](state, { payload: { id } }) {
    const task = state.byId[id];
    const newState = (task.state === 'active') ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return {
      ...state,
      byId: { ...state.byId, [task.id]: updatedTask },
    };
  },
  // END
}, { byId: {}, allIds: [] });

const text = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](_state, { payload }) {
    return payload.text;
  },
}, '');

export default combineReducers({
  tasks,
  text,
});

export const updateNewTaskText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const addTask = (task) => ({
  type: 'TASK_ADD',
  payload: {
    task,
  },
});

export const removeTask = (id) => ({
  type: 'TASK_REMOVE',
  payload: {
    id,
  },
});

export const cleanTasks = () => ({
  type: 'TASK_CLEAN',
});

export const replaceTasksBy = (tasks) => ({
  type: 'TASK_REPLACE',
  payload: {
    tasks,
  },
});

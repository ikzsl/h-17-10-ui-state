# Библиотека Redux Actions
Типичная работа с действиями сводится к созданию функции, принимающей данные и возвращающей объект действия:

```javaskript
const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: { task },
});
```

Даже в небольших JS-приложениях, действий десятки, а то и сотни. В итоге появляется множество одинакового кода. К тому же есть проблема: если ошибиться с именем в редьюсере или даже при формировании действия, то система ничего не скажет и придётся отлаживать такую ситуацию руками.

По этой причине появились библиотеки-хелперы, помогающие сократить код. Самой популярной является redux-actions. Она разделяет процесс создания объекта действия на два этапа:

1. Определение действий:

Функция createAction принимает тип действия (свойство type) и возвращает функцию, принимающую payload:

import { createAction } from 'redux-actions';

export const addUser = createAction('USER_ADD');

2. Определение редьюсеров:

Функция handleActions принимает объект, где ключами являются действия, а значением обработчики, устанавливающие свойство payload

```javascript
import { handleActions } from 'redux-actions';
import { addUser } from './actions.jsx';
​
const defaultState = {};
const userReducer = handleActions(
  {
    [addUser]: (state, { payload: { user } }) => {
      return { ...state, [user.id]: user };
    },
  },
  defaultState
);
​
export default combineReducers({
  users: userReducer,
});
```

Далее уже привычным образом в функцию createStore из Redux передаются редьюсеры, а функции действий используются при вызовах store.dispatch:

```javascript
import { addUser } from './actions.jsx'
import reducers from './reducers.jsx'

const user = /* get user from somewhere */;
const store = createStore(reducers);
store.dispatch(addUser({ user }));
```

>Примечание:

>Как вы могли заметить, в качестве ключа объекта для функции handleActions выступает функция, полученная из createAction на >самом же деле эта запись аналогична такой:

```javaskript
const actionsHandlers = {
  'ADD_TASK': (state) => (/* handler */)
};
```

>Такое поведение возможно благодаря внутреннему устройству функции createAction, если её сильно упростить, получится примерно >следующее:

```javaskript
const createAction = (type) => {
  const actionCreator = (payload) => ({ type, payload });
  actionCreator.toString = () => type; // black magic here
  return actionCreator;
};
```

На первый взгляд может показаться, что кода стало больше, но на самом деле его столько же. Но появились и плюшки:

- Каждый обработчик теперь отдельная функция, а значит их окружения не пересекаются, как в случае switch.
- Не нужно описывать поведение по умолчанию, когда возвращается сам state.
- Стало невозможным отправлять неправильное действие, так как каждая функция-обработчик формируется на основании функций, генерирующих действия.

В остальном всё остаётся по-прежнему. Эта библиотека не делает ничего кардинально нового, но позволяет сократить код и упростить отладку.

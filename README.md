# React Redux

Переходим к самой ожидаемой части — интеграции Redux с React. Сразу скажу, что дело это не простое и не всегда понятное. Поэтому действовать будем по следующей схеме: я покажу пошагово как скрестить ежа с ужом без погружения в детали, а в дальнейших уроках мы разберёмся что да как.

Команда Redux создала библиотеку [react-redux](https://react-redux.js.org/introduction/quick-start), которая значительно упрощает привязку Redux к React. Далее мы пройдём все этапы по её подключению к React-проекту.

![React Redux](https://coursehunters.online/uploads/default/original/1X/0c65de1fd60a5eff786cd9598fea1fe5cea36617.png)

_Редьюсеры и действия в этом руководстве не описываются. Их структура не зависит от того, с чем интегрируется Redux._

## Провайдер

Провайдер — React-компонент, который делает Redux-контейнер доступным для всего приложения. Он находится на верхнем уровне JSX и "оборачивает" в себя все остальные компоненты.

    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux'; // импорт компонента!
    import TasksBox from './components/TasksBox.jsx';
    import reducers from './reducers.jsx'

    // Контейнер передаётся в провайдер
    const store = createStore(reducers);

    render(
      <Provider store={store}>
        <TasksBox />
      </Provider>,
      document.getElementById('container'),
    );

Провайдер кроме прочего, выполняет подписку через `store.subscribe`. Это значит, что больше не придётся беспокоиться об обновлении приложения при изменении данных внутри контейнера.

## connect

Пакет _react-redux_ предоставляет функцию `connect`. Она связывает данные из контейнера со свойствами конкретного компонента.

    // components/TasksBox.jsx
    import React from 'react';
    import { connect } from 'react-redux';

    // Эта функция, берет нужные данные из контейнера и отдаёт их компоненту
    // Компоненту TasksBox нужны задачи
    const mapStateToProps = state => {
      const props = {
        tasks: state.tasks,
      }
      return props;
    };

    class TasksBox extends React.Component {
      render() {
        // Извлекаем задачи из свойств
        const { tasks } = this.props;
        // Отрисовываем задачи
      }
    }

    // connect соединяет контейнер с текущим компонентом
    // Наружу экспортируется компонент, который используется как обычно (пример выше)
    export default connect(mapStateToProps)(TasksBox);

Самое главное в этой схеме — функция `mapStateToProps`. Эта функция принимает на вход состояние из контейнера и должна возвратить объект, свойства которого станут `props` в подключаемом компоненте (в данном случае `<TasksBox>`). В тривиальном случае мы всегда можем реализовывать эту функцию так `state => state`. То есть берём и отдаём в компонент всё состояние. Но делать так не стоит по многим причинам, начиная от полной просадки производительности, заканчивая тем, что появляется сильная зависимость от структуры состояния и лишние данные там, где их не ждут. Более того, всю предварительную обработку данных, подготовленных для вывода, стоит делать именно здесь. В идеале в компоненты должны попадать уже готовые к выводу данные.

## dispatch

Функция `connect` пробрасывает в компонент дополнительные свойства. Самое важное из них - функция `dispatch`. Эта функция работает точь-в-точь как и `store.dispatch`. Ей нужно передать действие, что в свою очередь запустит цепочку вызовов до перерисовки. Полный код компонента ниже:

    // components/TasksBox.jsx
    import React from 'react';
    import { connect } from 'react-redux';
    import { addTask } from '../actions.jsx';

    const mapStateToProps = state => {
      const props = {
        tasks: state.tasks,
      }
      return props;
    };

    class TasksBox extends React.Component {
      handleAddTask = (e) => {
        e.preventDefault();
        // dispatch!
        const { dispatch, newTaskText } = this.props;
        dispatch(addTask({ text: newTaskText }));
      };

      render() {
        return <div>{/* logic with this.handleAddTask */}</div>;
      }
    }

    export default connect(mapStateToProps)(TasksBox);

## Файловая структура

Имея такое количество сущностей, возникает закономерный вопрос: как их раскладывать в файловой системе. Обычно делают так:

    actions/index.js
    components/App.jsx
    reducers/index.js
    index.jsx

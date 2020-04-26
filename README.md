# Передача действий
Функция `connect` позволяет обходиться без явного вызова `dispatch`. Общий принцип работы такой: в файл с компонентом импортируются необходимые действия и передаются вторым параметром в функцию `connect`.



    // components/TasksBox.jsx
    import React from 'react';
    import { connect } from 'react-redux';
    // Импортируем нужные действия
    import * as actions from '../actions';
    
    const mapStateToProps = state => {
      const props = {
        tasks: state.tasks,
      }
      return props;
    };
    
    // Формируем объект с действиями
    const actionCreators = {
      addTask: actions.addTask,
    };
    
    class TasksBox extends React.Component {
      handleAddTask = (e) => {
        e.preventDefault();
        const { addTask, newTaskText } = this.props;
        addTask({ text: newTaskText });
      };
    
      render() {
        const { tasks } = this.props;
        // Отрисовываем задачи
        return <div>{/* logic with this.handleAddTask */}</div>;
      }
    }
    
    // Передаём действия вторым параметром
    export default connect(mapStateToProps, actionCreators)(TasksBox);
Как видите, ничего не надо импортировать, всё есть в `props`. Технически действия оборачиваются в другие функции таким образом, что интерфейс работы остаётся прежним.
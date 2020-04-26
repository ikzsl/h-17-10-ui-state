## src/components/Tasks.jsx
Реализуйте компонент <Tasks />, добавив в него логику переключения "темы". Тема определяет классы, применяемые к конкретной задаче. По умолчанию используется светлая тема light. При клике на задачу она должна поменяться на dark. Классы для тем описаны в самом компоненте.

Задача со светлой темой:
```
<div class="mt-3">
  <ul class="list-group">
    <li class="list-group-item d-flex bg-light text-dark">
      <span class="mr-auto">
        <a href="#">Текст задачи</a>
      </span>
    </li>
  </ul>
</div>
```
Задача с темной темой:

```
<div class="mt-3">
  <ul class="list-group">
    <li class="list-group-item d-flex bg-dark text-light">
      <span class="mr-auto">
        <a href="#">Текст задачи</a>
      </span>
    </li>
  </ul>
</div>
```
## src/actions/index.js
Реализуйте действие(-я) необходимое для смены темы

## src/reducers/index.js
Реализуйте редьюсер для обработки UI состояния
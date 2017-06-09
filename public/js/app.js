/*jshint esversion: 6*/
const ToDoApp = {
  rootElement: '#app',
  todos: [],

  start:function () {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  cacheDOM:function () {
    this.root = document.querySelector(this.rootElement);
    // this.addButton = this.root.querySelector('.add-button');
    this.createForm = this.root.querySelector('.create-form');
    this.taskInput = this.root.querySelector('.task-input');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents:function () {
    // this.addButton.addEventListener('click', () => this.addTodo());
    this.createForm.addEventListener('submit', (event) => this.addTodo(event));
  },
  addTodo:function (event) {
    event.preventDefault();
    //first: grab the task input value
    const taskValue = this.taskInput.value;
    //first-part-2:validate that taskValue is actually "something"
    if(!taskValue){
      return;
    }
    //second:build a todo obj with that value
    const todo = {
      task: taskValue,
      isComplete: false
    };
    //third: add that todo to the todos array
    this.todos.push(todo);
    //fourth: rerender
    this.render();
    //fifth: clear the input
    this.taskInput.value = '';
  },

  cacheDeleteButtons: function () {
    this.deleteButtons = this.root.querySelectorAll('.delete');
    console.dir(this.deleteButtons);
  },

  bindDeleteEvents: function () {
    this.deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.deleteTodo(index));
    });
  },

  deleteTodo:function (index) {
    this.todos.splice(index, 1);
    this.render();
  },

  render:function () {
    const lis = this.todos.map(todo => `<li>${todo.task}<button class ='delete'>X</button></li>`).join('');
    this.todoList.innerHTML = lis; //Be careful. Can lead to security vulnerabilities.
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
  },

};
ToDoApp.start();

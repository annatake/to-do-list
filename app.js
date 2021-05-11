// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.todo-filter');

// Even Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo);

// Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Do not add todo if form is empty or only contains whitespaces
  if (todoInput.value.trim() === "") {
    return;
  }

  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value.trim();
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add todo to local storage
  saveTodos(todoInput.value);

  // Checkmark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  // Append to List
  todoList.appendChild(todoDiv);

  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete todo
  if(item.classList[0] === 'delete-btn') {
    const todoItem = item.parentElement;
    // Animation
    todoItem.classList.add('fall');
    // Also delete todo from local storage
    removeLocalTodo(todoItem);
    todoItem.addEventListener('transitionend', function() {
      todoItem.remove();
    });
  }

  // Check mark
  if (item.classList[0] === 'complete-btn') {
    const todoItem = item.parentElement;
    todoItem.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "incomplete":
        if (todo.classList.contains("completed")) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
        break;
    }
  });
}

function saveTodos(todo) {
  // Check if we already have todos saved in local storage
  let todos = checkLocalStorage();
  // Add new todo to our array
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  // Check if we already have todos saved in local storage
  let todos = checkLocalStorage();

  todos.forEach(function(todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Checkmark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // Append to List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  // Check if we already have todos saved in local storage
  let todos = checkLocalStorage();
  
  const todoValue = todo.children[0].innerText;
  console.log(todoValue);
  const todoIndex = todos.indexOf(todoValue)
  console.log(todoIndex);
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalStorage() {
  let todos;
  // Check if we already have todos saved in local storage
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}
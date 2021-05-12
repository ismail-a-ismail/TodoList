/* Selectors */

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-task");



/*--------------------- Functions ----------------------*/

// Function one
/*
    - Create New Task
*/
function addNewTask(event) {
  // prevent Form from submitting
  event.preventDefault();

  // create Task's DIV
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // create LI
  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  newTask.innerText = todoInput.value;

  // create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteButton.classList.add("delete-btn");

  // create Completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa fa-check"></i>';
  completedButton.classList.add("complete-btn");

  // append child elements to parent div
  taskDiv.appendChild(newTask);
  taskDiv.appendChild(deleteButton);
  taskDiv.appendChild(completedButton);

  // append Parnt div to .todo-list
  todoList.appendChild(taskDiv);

  // SAVE THE TASK TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  // clear todo input value after adding the task
  todoInput.value = "";
}


// Function two
function deleteTask(event) {
  const task = event.target;

  // delete task
  if (task.classList[0] === "delete-btn") {
    // add some animation while deleting task
    task.parentElement.classList.add("fall");

    removeLocalTasks(task.parentElement);

    // remove the task from DOM after animation's finishing
    task.parentElement.addEventListener("transitionend", function () {
      task.parentElement.remove();
    });
  }
}


// Function Three
function completeTask(event) {
  const task = event.target;

  // complete task
  if (task.classList[0] === "complete-btn") {
    task.parentElement.classList.toggle("completed");
  }
}


// Funcion four
function filterTask(event) {
  const tasks = todoList.children;

  for (let i = 0; i < tasks.length; i++) {
    switch (event.target.value) {
      case "all":
        tasks[i].style.display = "flex";
        break;

      case "completed":
        if (tasks[i].classList.contains("completed")) {
          tasks[i].style.display = "flex";
        } else {
          tasks[i].style.display = "none";
        }
        break;

      case "uncompleted":
        if (!tasks[i].classList.contains("completed")) {
          tasks[i].style.display = "flex";
        } else {
          tasks[i].style.display = "none";
        }
    }
  }
}


// Function five
/* 
    - Save task to localStorage
    - Take task as argument to save it
    - Calling inside (addNewTask) 
*/
function saveLocalTodos(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Function six
/* 
    - Retrieve tasks from localStorge, render them to DOM
*/
function retrieveTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create Task's DIV
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // create LI
    const newTask = document.createElement("li");
    newTask.classList.add("task-item");
    newTask.innerText = task;

    // create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.classList.add("delete-btn");

    // create Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // append child elements to parent div
    taskDiv.appendChild(newTask);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(completedButton);

    // append Parnt div to .todo-list
    todoList.appendChild(taskDiv);
  });
}


// Function seven
/* 
    - remove task from localStorage after delete it
*/
function removeLocalTasks(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const ti = tasks.indexOf(task.children[0].innerHTML);

  tasks.splice(ti, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}



/* Event Listners */
todoButton.addEventListener("click", addNewTask);

todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", completeTask);

filterOption.addEventListener("click", filterTask);

document.addEventListener("DOMContentLoaded", retrieveTasks);


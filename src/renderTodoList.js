import Data from "./data/data.js";

Data.restoreTasks();
renderTodoList();

function renderTodoList() {
  let todoList = document.querySelector(".js-todo-list");
  let todoListHTML = " ";
  todoListHTML += renderTasks();
  todoListHTML += renderDoneTasks();
  todoList.innerHTML = todoListHTML;

  addTask();
  compliteTask();
}

function addTask() {
  let taskInput = document.querySelector(".js-add-task-form");
  taskInput.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskName = document.querySelector(".js-task-input").value;
    document.querySelector(".js-task-input").value = "";
    if (taskName === "") return;
    
    Data.saveTask(taskName);
    renderTodoList();
  });
}

function compliteTask() {
  document.querySelectorAll(".js-check-box").forEach((checkBox) => {
    checkBox.addEventListener("click", (event) => {
      let reTask = false;
      let taskId = checkBox.dataset.taskId;

      let container = event.target.closest('.task'); 
      container.classList.forEach((className) => {
        if (className === "task-done") {
          reTask = true;
        }
      });

      if (!reTask) {
        Data.addTaskToDone(taskId);
        renderTodoList();
      } else {
        Data.removeTaskFromDone(taskId);
        renderTodoList();
      }
    });
  });
}

function renderTasks() {
  let todoListHTML = "";
  Data.todo.forEach((todo) => {
    todoListHTML += `
      <div class="task">
        <div class="check-box js-check-box" data-task-id="${todo.id}"></div>
        <div class="task-name-container" >
          <p class="task-name">${todo.text}</p>
        </div>
        <button class="delete-button">
          <img src="./src/icones/garbage.svg" alt="delete button" />
        </button>
      </div>
    `;
  });

  return todoListHTML;
}

function renderDoneTasks() {
  let todoListHTML = "";
  Data.done.forEach((todo) => {
    todoListHTML += `
      <div class="task task-done">
        <div class="check-box js-check-box" data-task-id="${todo.id}"></div>
        <div class="task-name-container" >
          <p class="task-name">${todo.text}</p>
        </div>
        <button class="delete-button">
          <img src="./src/icones/garbage.svg" alt="delete button" />
        </button>
      </div>
    `;
  });
  return todoListHTML;
}
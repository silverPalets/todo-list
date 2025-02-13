import Data from "./data/data.js";

restoreTask();
displayTasks();
addTask();

function addTask() {
  let taskInput = document.querySelector(".js-add-task-form");
  taskInput.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskName = document.querySelector(".js-task-input").value;
    if (taskName === "") return;

    saveTask(taskName);
    displayTasks();
  });
}

function saveTask(taskName) {
  let task = {
    text: taskName,
    id: Date.now(),
  };
  Data.todo.push(task);
  localStorage.setItem("todo", JSON.stringify(Data.todo));
}

function restoreTask() {
  Data.todo = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [
        {
          text: "Drink water \udb80\uddab",
          id: Date.now(),
        },
        {
          text: "do 10 Push-ups",
          id: Date.now() + 1,
        },
      ];
}

function displayTasks() {
  let todoList = document.querySelector(".js-todo-list");
  let todoListHTML = " ";

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

  todoList.innerHTML = todoListHTML;
}
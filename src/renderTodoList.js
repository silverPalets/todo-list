import Data from "./data/data.js";

Data.restoreTasks();
renderTodoList(Data);
setInterval(displayTime, 1000);
changeFeature();

function renderTodoList(Data) {
  let todoList = document.querySelector(".js-todo-list");
  let todoListHTML = " ";
  todoListHTML += renderTasks(Data.todo);
  todoListHTML += renderDoneTasks(Data.done);
  todoList.innerHTML = todoListHTML;

  addTask();
  compliteTask();
  deleteListener();
}

function addTask() {
  let taskInput = document.querySelector(".js-add-task-form");
  if (taskInput) {
    taskInput.addEventListener("submit", (e) => {
      e.preventDefault();
      let taskName = document.querySelector(".js-task-input").value;
      document.querySelector(".js-task-input").value = "";
      if (taskName === "") return;

      Data.saveTask(taskName);
      renderTodoList(Data);
    });
  }
}

function compliteTask() {
  document.querySelectorAll(".js-check-box").forEach((checkBox) => {
    checkBox.addEventListener("click", (event) => {
      let reTask = false;
      let taskId = checkBox.dataset.taskId;

      let container = event.target.closest(".task");
      container.classList.forEach((className) => {
        if (className === "task-done") {
          reTask = true;
        }
      });

      if (!reTask) {
        Data.addTaskToDone(taskId);
        renderTodoList(Data);
      } else {
        Data.removeTaskFromDone(taskId);
        renderTodoList(Data);
      }
    });
  });
}

function renderTasks(todoTasks) {
  let todoListHTML = "";
  todoTasks.forEach((todo) => {
    todoListHTML += `
      <div class="task">
        <div class="check-box js-check-box" data-task-id="${todo.id}"></div>
        <div class="task-name-container" >
          <p class="task-name">${todo.text}</p>
        </div>
        <button class="delete-button js-delete-button" data-task-id="${todo.id}" data-task-stat="todo">
          <img src="./src/icones/garbage.svg" alt="delete button" />
        </button>
      </div>
    `;
  });

  return todoListHTML;
}

function renderDoneTasks(doneTasks) {
  let todoListHTML = "";
  doneTasks.forEach((todo) => {
    todoListHTML += `
      <div class="task task-done">
        <div class="check-box js-check-box" data-task-id="${todo.id}"></div>
        <div class="task-name-container" >
          <p class="task-name">${todo.text}</p>
        </div>
        <button class="delete-button js-delete-button" data-task-id="${todo.id}" data-task-stat="done">
          <img src="./src/icones/garbage.svg" alt="delete button" />
        </button>
      </div>
    `;
  });
  return todoListHTML;
}

function deleteListener() {
  document.querySelectorAll(".js-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      Data.removeTask(button.dataset.taskId, button.dataset.taskStat);
      renderTodoList(Data);
    });
  });
}

function changeFeature() {
  let changeFeatureButton = document.querySelector(".js-change-feature-button");

  changeFeatureButton.addEventListener("click", () => {
    let mainPart = document.querySelector(".js-main-part");
    let toSearchStage = mainPart.querySelector(".js-add-task-form");
    if (toSearchStage) {
      document.querySelector(".js-change-feature-button").innerHTML = `
          <img
            class="add-icon"
            src="./src/icones/add-icon.svg"
            alt="search icon"
          />
        `;

      document.querySelector(".js-add-task-form").remove();

      let mainHtml = `
        <form action="" class="search-task-bar js-search-task-form">
          <div class="paragraph-icon-wrapper">
            <img class="paragraph-icon" src="./src/icones/parapraph.svg" />
          </div>
          <input
            class="search-input js-search-input"
            type="text"
            placeholder="Search a word"
          />
          <button type="submit" class="search-button js-search-button">
            <img
              class="search-icon"
              src="./src/icones/fluent_search-28-regular.svg"
              alt="add icon"
            />
          </button>
        </form>
      `;

      mainHtml += mainPart.innerHTML;

      mainPart.innerHTML = mainHtml;
      searchButtonListener();
      document.querySelector(".js-todo-list").innerHTML = "";
    } else {
      document.querySelector(".js-change-feature-button").innerHTML = `
          <img
            class="add-icon"
            src="./src/icones/fluent_search-28-regular.svg
            "
            alt="search icon"
          />
      `;

      document.querySelector(".js-search-task-form").remove();

      let mainHtml = `
        <form class="add-task-bar js-add-task-form">
          <div class="paragraph-icon-wrapper">
            <img class="paragraph-icon" src="./src/icones/parapraph.svg" />
          </div>
          <input
            class="task-input js-task-input"
            type="text"
            placeholder="Add a task"
          />
          <button type="submit" class="add-button js-add-button">
            <img
              class="add-icon"
              src="./src/icones/add-icon.svg"
              alt="add icon"
            />
          </button>
        </form>
      `;

      mainHtml += mainPart.innerHTML;
      mainPart.innerHTML = mainHtml;

      renderTodoList(Data);
    }
  });
}

function searchButtonListener() {
  let searchButton = document.querySelector(".js-search-button");
  if (searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();

      let searchInput = document.querySelector(".js-search-input");
      let searchValue = searchInput.value;
      searchInput.value = "";

      let resoults = Data.findTask(searchValue);

      renderTodoList(resoults);
    });
  }
}

function displayTime() {
  let timeTag = document.querySelector(".js-time");
  const momment = require("moment");
  const timeFormat = "H:m:s";
  let currentMoment = momment().format(timeFormat);
  timeTag.innerHTML = currentMoment;
}
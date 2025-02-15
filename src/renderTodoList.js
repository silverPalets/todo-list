import Data from "./data/data.js";

Data.restoreTasks();
renderTodoList();

function renderTodoList() {
  let todoList = document.querySelector(".js-todo-list");
  let todoListHTML = " ";
  todoListHTML += renderTasks(Data.todo);
  todoListHTML += renderDoneTasks(Data.done);
  todoList.innerHTML = todoListHTML;

  addTask();
  compliteTask();
  deleteListener();
  searchPage();
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

      let container = event.target.closest(".task");
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
      renderTodoList();
    });
  });
}

// findTask(taskWord) {
//   let matchTodo = [];
//   let matchDone = [];

//   let todoLength = Data.todo.length();
//   let doneLength = Data.done.length();
//   let maxLength= todoLength > doneLength? todoLength : doneLength;

//   for(let i = 0; i < maxLength; i++) {
//     if ( i < todoLength) {
//       let element = Data.todo[i];
//       if (element.includes(taskWord)) {
//         matchTodo.push(element);
//       }
//     }
//     if (i < doneLength) {
//       let element = Data.done[i];
//       if (element.includes(taskWord)) {
//         matchDone.push(element);
//       }
//     }
//   }
// }

function searchPage() {
  document.querySelector(".js-search-button").addEventListener("click", () => {
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
  let mainPart = document.querySelector(".js-main-part");
  mainHtml += mainPart.innerHTML;
  
  mainPart.innerHTML = mainHtml;
  });
}

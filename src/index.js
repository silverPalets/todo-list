import Data from "./data/data.js";

Data.todo = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : ["Drink water \udb80\uddab", "do 10 Push-ups"];

displayTasks();

let taskInput = document.querySelector(".js-add-task-form");
taskInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = document.querySelector(".js-task-input").value;
  document.querySelector(".js-task-input").value = "";

  Data.todo.push(task);
  localStorage.setItem("todo", JSON.stringify(Data.todo));

  displayTasks();
});

function displayTasks() {
  let todoList = document.querySelector(".js-todo-list");
  let todoListHTML = " ";

  Data.todo.forEach((todo) => {
    todoListHTML += `
      <div class="task">
        <div class="check-box"></div>
        <div class="task-name-container">
          <p class="task-name">${todo}</p>
        </div>
        <button class="delete-button">
          <img src="./src/icones/garbage.svg" alt="delete button" />
        </button>
      </div>
    `;
  });


  todoList.innerHTML = todoListHTML;
}

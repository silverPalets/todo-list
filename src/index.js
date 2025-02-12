import Data from "./data/data.js";

Data.todo = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : ["Drink water \udb80\uddab", "do 10 Push-ups"];

console.log(Data.todo);

let taskInput = document.querySelector(".js-add-task-form");
taskInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = document.querySelector(".js-task-input").value;
  document.querySelector(".js-task-input").value = "";

  Data.todo.push(task);
  localStorage.setItem("todo", JSON.stringify(Data.todo));
  console.log(Data);
});

export class Data {
  static todo = [];
  static done = [];

  static saveTask(taskName) {
    let task = {
      text: taskName,
      id: Date.now().toString(),
    };
    Data.todo.push(task);
    localStorage.setItem("todo", JSON.stringify(Data.todo));
  }

  static restoreTasks() {
    this.todo = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [
          {
            text: "Drink water",
            id: "1739461106928",
          },
          {
            text: "do 10 Push-ups",
            id: "1739461106929",
          },
        ];

    this.done = localStorage.getItem("done")
      ? JSON.parse(localStorage.getItem("done"))
      : [
          {
            text: `Design a responsive navbar with dropdown using HTML, CSS, and
                  JavaScript.`,
            id: "1739461106930",
          },
        ];
  }

  static saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(Data.todo));
    localStorage.setItem("done", JSON.stringify(Data.done));
  }

  static addTaskToDone(taskId) {
    this.todo.forEach((element, index) => {
      if (element.id === taskId) {
        console.log("addToTask part");
        this.done.push(element);
        this.todo.splice(index, 1);
        this.saveToLocalStorage();
      }
    });
  }

  static removeTaskFromDone(taskId) {
    this.done.forEach((element, index) => {
      if (element.id === taskId) {
        this.todo.push(element);
        this.done.splice(index, 1);
        this.saveToLocalStorage();
      }
    });
  }

  static removeTask(taskId, taskStat) {
    if (taskStat === "todo") {
      this.todo.forEach((element, index) => {
        if (element.id === taskId) {
          this.todo.splice(index, 1);
          this.saveToLocalStorage();
        }
      });
    } else if (taskStat === "done") {
      this.done.forEach((element, index) => {
        if (element.id === taskId) {
          this.done.splice(index, 1);
          this.saveToLocalStorage();
        }
      });
    }
  }

  static findTask(taskWord) {
    let todo = [];
    let done = [];
    this.restoreTasks();
    
    let todoLength = this.todo.length;
    let doneLength = this.done.length;
    let maxLength = todoLength > doneLength ? todoLength : doneLength;

    for (let i = 0; i < maxLength; i++) {
      if (i < todoLength) {
        let element = this.todo[i];
        if (element.text.includes(taskWord)) {
          todo.push(element);
        }
      }
      if (i < doneLength) {
        let element = this.done[i];
        if (element.text.includes(taskWord)) {
          done.push(element);
        }
      }
    }

    return {
      todo,
      done,
    };
  }
}

export default Data;

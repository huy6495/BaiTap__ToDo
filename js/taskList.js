function TaskList() {
  this.arr = [];

  //Add Task
  this.addTask = function (task) {
    this.arr.push(task);
  };

  //Find index
  this.findIndex = function (id) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  //Remove Task
  this.remove = function (idTask) {
    var indexFound = this.findIndex(idTask);
    if (indexFound !== -1) {
      this.arr.splice(indexFound, 1);
    }
  };

  //Change Status
  this.change = function (idTask) {
    var indexFound = this.findIndex(idTask);
    if (indexFound !== -1) {
      if (this.arr[indexFound].status === "toDo") {
        this.arr[indexFound].status = "completed";
      } else {
        this.arr[indexFound].status = "toDo";
      }
    }
  };
}

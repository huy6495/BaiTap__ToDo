/**
 * Nguoi tao: Nguyen Quoc Huy
 * Ngay tao: 19/01/2021
 * Muc dich: Bai tap ToDo
 */

function getEle(ele) {
  return document.getElementById(ele);
}

var tL = new TaskList();

getLocalStorage();

/**
 * Check Validation
 */
var arrNoti = ["(*) Vui lòng nhập nhiệm vụ", "Nhiệm vụ đã có trong danh sách"];

function valid(IdInput, notiId, indexNoti) {
  var value = getEle(IdInput).value;
  var checked = true;
  if (value === "") {
    getEle(notiId).innerHTML = arrNoti[indexNoti];
    return (checked = false);
  }
  for (var i = 0; i < tL.arr.length; i++) {
    if (tL.arr[i].name.toLowerCase() === value.toLowerCase()) {
      getEle(notiId).innerHTML = arrNoti[indexNoti + 1];
      return (checked = false);
    }
  }
  return checked;
}

/**
 * Add Task
 */
getEle("addItem").addEventListener("click", function (event) {
  event.preventDefault();
  if (valid("newTask", "notiInput", 0)) {
    getEle("notiInput").innerHTML = "";
    var taskName = getEle("newTask").value;
    var taskId = Math.random();
    var status = "toDo";
    var task = new Task(taskName, taskId, status);
    tL.addTask(task);
    renderList(tL.arr);
    setLocalStorage();
  }
});

//Create Line
function createLine(task) {
  return `<li>
      <span>${task.name}</span>
      <div class="buttons">
        <button
          class="remove"
          onclick="removeTask(${task.id})"
        >
          <i class="fa fa-trash-alt"></i>
        </button>
        <button
          class="complete"
          onclick="changeStatus(${task.id})"
        >
          <i class="far fa-check-circle"></i>
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </li>`;
}

//Render List
function renderList(arr) {
  var contentToDo = "";
  var contentCom = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].status === "toDo") {
      contentToDo += createLine(arr[i]);
    } else {
      contentCom += createLine(arr[i]);
    }
  }
  getEle("todo").innerHTML = contentToDo;
  getEle("completed").innerHTML = contentCom;
}

//Remove Task
function removeTask(IdTask) {
  tL.remove(IdTask);
  renderList(tL.arr);
  setLocalStorage();
}

//Change Status
function changeStatus(idTask) {
  tL.change(idTask);
  renderList(tL.arr);
  setLocalStorage();
}

//Local Storage
function setLocalStorage() {
  localStorage.setItem("TaskList", JSON.stringify(tL.arr));
}

function getLocalStorage() {
  if (localStorage.getItem("TaskList")) {
    tL.arr = JSON.parse(localStorage.getItem("TaskList"));
    renderList(tL.arr);
  }
}

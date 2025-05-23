const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task;

    span.addEventListener("click", () => {
      span.classList.toggle("completed");
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    uptadeLocaleStorage();
    renderTasks();
    taskInput.value = "";
  }
}

function editTask(index) {
  const uptated = prompt("Add new task:", tasks[index]);
  if (uptated !== null && uptated.trim() !== "") {
    tasks[index] = uptated.trim();
    uptadeLocaleStorage();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    uptadeLocaleStorage();
    renderTasks();
  }
}

function uptadeLocaleStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();

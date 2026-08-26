const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = [];

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskInput.value.trim();

    console.log("Task entered:", title);
    console.table(tasks);

    if(!title) return;
    tasks.push(title);
    taskInput.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task";
        li.textContent = task;
        taskList.appendChild(li);
    });
}
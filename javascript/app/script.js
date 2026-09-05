const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const loadDataButton = document.getElementById("load-data");
const apiResult = document.getElementById("api-result");

let tasks = [];

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(taskForm);

    const response = await fetch(
        "https://httpbin.org/post",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    console.log(data);
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

loadDataButton.addEventListener("click", async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Learning Network Tab",
                body: "Practicing POST requests",
                userId: 1
            })
        }
    );

    const data = await response.json();

    console.log(data);
    apiResult.textContent = data.title;
});

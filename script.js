let tasks = JSON.parse(localStorage.getItem("tasks")) || []
const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

function displayTasks(task) {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
        li.classList.add("completed")
    }
    taskText.addEventListener("click", function () {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", function () {

        tasks = tasks.filter(function (item) {
            return item.id !== task.id
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
        li.remove()
    });

    li.appendChild(taskText);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

tasks.forEach(function (task) {
    displayTasks(task)
})
addBtn.addEventListener("click", function () {
    if (taskInput.value.trim() === "") {
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskInput.value.trim(),
        completed: false
    }
    tasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    displayTasks(newTask)
    taskInput.value = ""
    li.appendChild(delBtn)
})

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addBtn.click()
    }
})


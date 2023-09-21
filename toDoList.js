const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Function to save tasks to Local Storage
function saveTasksToLocalStorage() {
    const tasks = [];

    // Collect task data from the list
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('.checkbox').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });

    // Save tasks as JSON in Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from Local Storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        // Populate the task list with saved tasks
        tasks.forEach((task) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <button class="delete">Delete</button>
            `;

            taskList.appendChild(listItem);

            // Attach event listeners for delete and checkbox
            const deleteButton = listItem.querySelector('.delete');
            deleteButton.addEventListener('click', function () {
                listItem.remove();
                saveTasksToLocalStorage();
            });

            const checkbox = listItem.querySelector('.checkbox');
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    listItem.classList.add('completed');
                } else {
                    listItem.classList.remove('completed');
                }
                saveTasksToLocalStorage();
            });
        });
    }
}

// Add a new task to the list
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <button class="delete">Delete</button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = '';

    // Attach event listeners for delete and checkbox
    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        saveTasksToLocalStorage();
    });

    const checkbox = listItem.querySelector('.checkbox');
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
        saveTasksToLocalStorage();
    });

    // Save tasks to Local Storage
    saveTasksToLocalStorage();
});

//Function to toggle the strikethrough style when a checkbox is clicked

function toggleStrikethrough(event) {
    const listItem = event.target.closest('li');
    if (listItem) {
        const textElement = listItem.querySelector('span');
        if (textElement) {
            textElement.classList.toggle('strikethrough');
        }
    }
}

//Attatch a click event listener to the task list to toggle strikethrough

taskList.addEventListener('click', function (event) {
    if (event.target.matches('.checkbox')) {
        toggleStrikethrough(event);
        saveTasksToLocalStorage(); // Save the updated statue
    }
});
// Load tasks from Local Storage when the page loads
loadTasksFromLocalStorage();

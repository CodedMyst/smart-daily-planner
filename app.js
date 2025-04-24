const API_URL = 'http://localhost:3000/tasks';

// Fetch and display tasks
const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} at ${task.time}`;
        taskList.appendChild(taskItem);
    });
};

// Add a task
document.getElementById('add-task-btn').addEventListener('click', async () => {
    const taskName = document.getElementById('task-name').value;
    const taskTime = document.getElementById('task-time').value;

    if (taskName && taskTime) {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: taskName, time: taskTime }),
        });
        fetchTasks(); // Refresh the task list
        document.getElementById('task-name').value = '';
        document.getElementById('task-time').value = '';
    } else {
        alert('Please enter both task name and time.');
    }
});

// Initial fetch
fetchTasks();
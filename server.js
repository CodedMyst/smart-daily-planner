const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const TASKS_FILE = 'tasks.json';

// Read tasks from file
const readTasks = () => {
    if (fs.existsSync(TASKS_FILE)) {
        const data = fs.readFileSync(TASKS_FILE);
        return JSON.parse(data);
    }
    return [];
};

// Write tasks to file
const writeTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    let tasks = readTasks();
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id, 10));
    writeTasks(tasks);
    res.status(200).send('Task deleted');
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    let tasks = readTasks();
    tasks = tasks.map(task =>
        task.id === parseInt(req.params.id, 10) ? { ...task, ...req.body } : task
    );
    writeTasks(tasks);
    res.status(200).json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
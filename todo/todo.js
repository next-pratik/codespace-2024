const fs = require('fs');
const filepath = "./task.json";

// Function to load tasks from the file
const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON = dataBuffer.toString();
        const tasks = JSON.parse(dataJSON);

        // Ensure the parsed result is an array
        if (Array.isArray(tasks)) {
            return tasks;
        } else {
            return [];  // Return an empty array if the content is not an array
        }
    } catch (error) {
        return [];  // Return an empty array if the file doesn't exist or there's an error
    }
};

// Function to save tasks to the file
const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);  // Format the JSON for better readability
    fs.writeFileSync(filepath, dataJSON);
};

// Add a new task
const addTask = (taskName) => {
    const tasks = loadTask();  // Load current tasks
    console.log("Loaded tasks:", tasks);  // Log tasks to verify the content

    // Ensure tasks is an array before pushing
    if (!Array.isArray(tasks)) {
        console.log("The tasks variable is not an array!");
        return;
    }

    tasks.push({ task: taskName });  // Add the new task correctly
    saveTask(tasks);  // Save the updated list
    console.log("Task added:", taskName);
};

// List all tasks
const listTask = () => {
    const tasks = loadTask();  // Load tasks
    if (tasks.length === 0) {
        console.log("No tasks to show.");
    } else {
        tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));  // Print each task
    }
};

// Process command-line arguments
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    if (argument) {
        addTask(argument);  // Add a new task
    } else {
        console.log("Please provide a task name.");
    }
} else if (command === "list") {
    listTask();  // List all tasks
} else {
    console.log("Command not found. Use 'add' or 'list'.");
}

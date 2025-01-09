import express from "express";
const tasks = [
  {
    id: 1,
    title: "Fix a critical bug",
    project: "Project Alpha",
    assignedTo: "Bob",
    priority: "high",
    status: "open",
  },
  {
    id: 2,
    title: "Implement a new feature",
    project: "Project Alpha",
    assignedTo: "Charlie",
    priority: "medium",
    status: "in progress",
  },
  {
    id: 3,
    title: "Write documentation",
    project: "Project Beta",
    assignedTo: "Bob",
    priority: "low",
    status: "open",
  },
];

const app = express();

app.use(express.json());

function getAllTasks(name) {
  // filtering out task based on assignedTo
  return tasks.filter((task) => task.assignedTo === name);
}

app.get("/projects/:name/tasks", (req, res) => {
  try {
    // get params from url
    const name = req.params.name;

    // checking if name is valid name
    if (!name || typeof name !== string)
      return res
        .status(404)
        .json({ message: "credentails required and should be valid" });

    // function that get all tasks by assigned to
    const tasks = getAllTasks(name);

    // checking if task are not found
    if (!tasks) {
      return res.status(400).json({ message: "Tasks , NOT FOUND" });
    }

    // sending task to user with status code
    res.status(200).json({ tasks });
  } catch (error) {
    // error message if smomething else went wrong
    res.status(500).json({ error: error.message });
  }
});

// function that sorts the tasks by priority
function getAllTasksSorted() {
  return tasks.sort((a, b) => b.priority - a.priority);
}

app.get("/projects/sort/by-task-size", (req, res) => {
  try {
    // getting task sorted
    const tasks = getAllTasksSorted();

    // checking null if it returns
    if (!tasks) {
      return res.status(400).json({ message: "Tasks , NOT FOUND" });
    }
    // sending response
    res.status(200).json({ tasks });
  } catch (error) {
    // error message if smomething else went wrong
    res.status(500).json({ error: error.message });
  }
});

// function that adds tasks
function addNewTask(taskDetails) {
  return tasks.push(taskDetails);
}

app.get("/tasks", (req, res) => {
  try {
    // sending data to function that adds new Tasks
    const newTask = addNewTask({
      id: tasks.length + 1,
      title: "Fix a malformed bug",
      project: "Project Gama",
      assignedTo: "Atharva",
      priority: "high",
      status: "open",
    });

    // if any problem occurs while adding
    if (!newTask) {
      res.status(400).json({ message: "Task, Creating Problem" });
    }
    // sending success message to the user
    res.status(201).json({ message: "Task Created successfully.", newTask });
  } catch (error) {
    // error message if something else went wrong
    res.status(500).json({ error: error.message });
  }
});

function getAllTaskAssigned(name, tasks) {
  return tasks.filter((task) => task.assignedTo === name);
}

app.get("/users/:name/tasks", (req, res) => {
  try {
    const name = req.params.name;
    let getAllTasks = getAllTaskAssigned(name, tasks);
    if (getAllTasks.length < 0) {
      return res.status(404).json({ message: "Tasks. NOT FoUND" });
    }
    res.status(200).json({ tasks: getAllTasks });
  } catch (error) {
    res.status(500).json({ error: message });
  }
});

function getAllPendingTasks(tasks) {
  return tasks.filter((task) => task.status === "open");
}

app.get("/tasks/pending", (req, res) => {
  try {
    const pendingTasks = getAllPendingTasks(tasks);

    if (pendingTasks.length === 0) {
      return res.status(404).json({ message: "Task, NOT FOUND" });
    }

    res.status(200).json({ tasks: pendingTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getSortedTask(tasks) {
  return tasks.sort((a, b) => b.priority - a.priority);
}

app.get("/tasks/sort/by-priority", (req, res) => {
  try {
    const sortTask = getSortedTask(tasks);
    res.status(200).json({ tasks: sortTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getTasksByStatus(id, tasks) {
  const taskToUpdate = tasks.filter((task) => task.id === id);
  taskToUpdate.status = "in progress";
  return taskToUpdate;
}

app.post("/tasks/:id/status", (req, res) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== "string")
      return res
        .status(404)
        .json({ message: "id is required and should be string." });

    const getStatus = getTasksByStatus(id, tasks);

    if (getStatus.length === 0)
      return res.status(404).json({ message: "Tasks, NOT FOUND" });

    res.status(200).json({ tasks: getStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () =>
  console.log("Example app listening on http://localhost:3000")
);

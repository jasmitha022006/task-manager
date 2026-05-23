const Task = require("../models/Task");

// GET all tasks
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: "Error Fetching Tasks",
      error,
    });

  }
};

// ADD new task
const addTask = async (req, res) => {
  try {

    const { title } = req.body;

    const newTask = new Task({
      title,
    });

    await newTask.save();

    res.status(201).json({
      message: "Task Added Successfully ✅",
      task: newTask,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error Adding Task",
      error,
    });

  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      message: "Task Deleted Successfully 🗑️",
    });

  } catch (error) {

    res.status(500).json({
      message: "Error Deleting Task",
      error,
    });

  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated Successfully ✏️",
      task: updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      message: "Error Updating Task",
      error,
    });

  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
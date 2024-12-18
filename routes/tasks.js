import "dotenv/config";
import express from "express";
import { validationResult } from "express-validator";
import createTaskRules from "../rules/createTask.js";
import Task from "../models/task.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    // Validate if the `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
  
    try {
      // Query the database for the task
      const task = await Task.findById(id);
  
      if (!task) {
        // Handle case when thestask is not found
        return res.status(404).json({ message: "Task not found" });
      }
  
      // If the task exists, return it
      res.status(200).json(task);
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

router.post("/", ...createTaskRules,  async (req, res) => {
    const errors = validationResult(req);
  
    // If validation fails, return errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { taskTitle, priority, dueDate, status } = req.body;
  
    // Create the new task
    const newTask = new Task({
      taskTitle,
      priority,
      dueDate,
      status: status || false, // Default to false if no status is provided
    });
  
    try {
      // Save the task to the database
      const savedTask = await newTask.save();
      res.status(201).json({
        message: "Task created successfully",
        task: savedTask,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

  router.put("/:id", (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { taskTitle, priority, dueDate, status } = req.body;
  
    const updateTask = {
        taskTitle,
        priority,
        dueDate,
        status: status || false,
    };
  
    Task.updateOne({ _id: req.params.id }, updateTask)
      .then(() => {
        res.status(200).json({
          message: "Task updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  router.delete("/:id", (req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
  
  
  export default router;
  
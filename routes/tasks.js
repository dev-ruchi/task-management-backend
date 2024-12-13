import "dotenv/config";
import express from "express";
import { validationResult } from "express-validator";
import createTaskRules from "../rules/createTask.js";
import Task from "../models/task.js";
//import mongoose from "mongoose";

const router = express.Router();

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
  
  export default router;
  
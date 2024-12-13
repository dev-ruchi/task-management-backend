// Import mongoose
import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    priority: {
      type: String,
      required: true,
      enum: ["High", "Medium", "Low"], // Dropdown values
    },
    dueDate: {
      type: Date,
      required: true, // Due date is required
    },
    status: {
      type: Boolean,
      default: false, // Toggle: false means Not Completed, true means Completed
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Task model
const Task = mongoose.model("Task", taskSchema);

export default Task;

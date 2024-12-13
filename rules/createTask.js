import { body } from "express-validator";

export default [
  body("taskTitle")
    .isString()
    .withMessage("Task title must be a string")
    .isLength({ max: 100 })
    .withMessage("Task title must be at most 100 characters long"),

  body("priority")
    .isString()
    .withMessage("Priority must be a string")
    .isIn(["High", "Medium", "Low"])
    .withMessage("Priority must be one of 'High', 'Medium', or 'Low'"),

  body("dueDate")
    .isISO8601()
    .withMessage("Due date must be a valid date in ISO format")
    .notEmpty()
    .withMessage("Due date is required"),

  body("status")
    .isBoolean()
    .withMessage("Status must be a boolean")
    .optional()
    .isIn([true, false])
    .withMessage("Status must be either true (Completed) or false (Not Completed)"),
];

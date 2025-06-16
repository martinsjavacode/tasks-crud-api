import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createDate: {
    type: Date,
  },
  modifyDate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

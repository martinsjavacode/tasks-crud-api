import mongoose from "mongoose";

import task from "./task.model.js";
import user from "./user.model.js";

mongoose.Promise = global.Promise;

export default {
  mongoose,
  task,
  user,
};

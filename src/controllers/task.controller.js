import db from "../models/index.js";

const Task = db.task;

const returnTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
      deleted: false,
    }).exec();

    return res.status(200).send({ tasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .send({ message: "O título da task é obrigatório" });
    }

    const task = new Task({
      userId: req.userId,
      title,
      createDate: new Date(),
      modifyDate: new Date(),
    });

    await task.save();

    returnTasks(req, res, next);
  } catch (err) {
    next();
  }
};

export const getTasks = async (req, res, next) => {
  await returnTasks(req, res, next);
};

const updateTask = (prop, value) => (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        [prop]: value,
        modifyDate: new Date(),
      },
    },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then((task) => {
      if (!task) {
        return res.status(400).send({ message: "Erro ao atualizar a task" });
      }

      returnTasks(req, res, next);
    })
    .catch(next);
};

export const completeTask = updateTask("completed", true);

export const uncompleteTask = updateTask("completed", false);

export const deleteTask = updateTask("deleted", true);

import db from "../models/index.js";

const User = db.user;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (user) {
      if (user.username === req.body.username) {
        return res.status(400).send({ message: "Usuário já cadastrado" });
      } else {
        return res.status(400).send({ message: "Email já cadastrado" });
      }
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

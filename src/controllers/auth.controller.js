import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

const User = db.user;

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (username && email && password) {
      const user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        created: new Date(),
      });

      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24H",
      });

      res.send({
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(500).send({ message: "Erro ao cadastrar o usuário" });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).send({
        accessToken: null,
        message: "Usuário não encontrado",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Senha inválida",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24H",
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).exec();

    res.send({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    next(err);
  }
};

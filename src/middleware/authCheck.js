import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  const authHeader = req.headers.authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(403).send({ message: "Token não encontrado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado" });
    }

    req.userId = decoded.id;

    next();
  });
};

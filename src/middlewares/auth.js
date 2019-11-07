const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id, name, email } = jwt.verify(token, process.env.JWT_KEY);

    req.user = { id, name, email };

    return next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido", e });
  }
};

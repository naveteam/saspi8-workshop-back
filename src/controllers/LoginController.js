const User = require("../models/User");

const LoginController = {
  store: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "E-mail não cadastrado" });
    }

    if (!user.verifyPassword(password)) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = User.generateToken(user);

    return res.status(201).json({ user, token });
  }
};

module.exports = LoginController;

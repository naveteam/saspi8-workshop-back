const User = require("../models/User");

const UseController = {
  index: async (req, res) => {
    const users = await User.find();

    return res.json(users);
  },

  show: async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  },

  store: async (req, res) => {
    const user = await User.create(req.body);

    return res.status(201).json(user);
  },

  update: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  },

  destroy: async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    return res.status(204).json();
  }
};

module.exports = UseController;

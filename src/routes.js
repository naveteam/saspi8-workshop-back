const routes = require("express").Router();

const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");

routes.post("/users", UserController.store);
routes.post("/login", LoginController.store);

/**
 * Rotas autenticadas a partir daqui
 */
routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

module.exports = routes;

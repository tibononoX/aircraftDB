const express = require("express");

const { UserController, AuthController } = require("../controllers");

const router = express.Router();

//  Register, login and logout routes
router.post("/", UserController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

//  User CRUD routes
router.get(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UserController.browse
);
router.get("/userNumber", UserController.getLength);
router.get(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UserController.read
);
router.put(
  "/:id",
  AuthController.isUserConnected,
  // FileController.uploadUser,
  UserController.edit
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  UserController.delete
);

module.exports = router;

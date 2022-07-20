const express = require("express");

const { AuthController, FileController } = require("../controllers");

const router = express.Router();

router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  FileController.delete
);

module.exports = router;

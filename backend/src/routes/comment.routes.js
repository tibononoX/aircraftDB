const express = require("express");

const { CommentController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", CommentController.browseByIdea);
router.post("/", AuthController.isUserConnected, CommentController.newComment);

module.exports = router;

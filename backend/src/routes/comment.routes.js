const express = require("express");

const { CommentController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", CommentController.browseByAircraft);
router.get("/:id", CommentController.read);
router.post("/", AuthController.isUserConnected, CommentController.newComment);
router.post("/vote", AuthController.isUserConnected, CommentController.vote);
router.get("/vote/:ideaId", CommentController.browseVote);

module.exports = router;

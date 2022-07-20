const express = require("express");

const { FavoriteController, AuthController } = require("../controllers");

const router = express.Router();

router.get("/", AuthController.isUserConnected, FavoriteController.browseFav);
router.post("/add", AuthController.isUserConnected, FavoriteController.fav);

module.exports = router;

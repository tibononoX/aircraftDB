const express = require("express");

const userRoutes = require("./user.routes");
const aircraftRoutes = require("./aircraft.routes");
const commentRoutes = require("./comment.routes");
const imageRoutes = require("./image.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/aircrafts", aircraftRoutes);
router.use("/comments", commentRoutes);
router.use("/images", imageRoutes);

module.exports = router;

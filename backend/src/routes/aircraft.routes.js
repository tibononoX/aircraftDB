const express = require("express");

const {
  AircraftController,
  AuthController,
  FileController,
} = require("../controllers");

const router = express.Router();

//  Aircraft CRUD routes
router.get("/", AircraftController.browse);
router.get("/manufacturers", AircraftController.getManufacturers);
router.get("/types", AircraftController.getTypes);
router.get("/:id", AircraftController.read);
router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  FileController.uploadAircraft,
  AircraftController.newAircraft
);

router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  // FileController.uploadAircraft,
  AircraftController.edit
);
router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.delete
);

module.exports = router;
